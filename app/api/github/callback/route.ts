import { timingSafeEqual } from "node:crypto";
import { createAppAuth } from "@octokit/auth-app";
import { Octokit } from "@octokit/rest";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { readFile } from "node:fs/promises";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const expectedState = cookieStore.get("github_install_state")?.value;

  const clearStateCookie = () =>
    NextResponse.json(
      { error: "GitHub connection could not be completed." },
      { status: 400 },
    );

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const returnedState = url.searchParams.get("state");
  const installationId = url.searchParams.get("installation_id");
  const githubError = url.searchParams.get("error");

  if (githubError) {
    const response = NextResponse.json(
      { error: "GitHub authorization was not completed." },
      { status: 400 },
    );
    response.cookies.delete("github_install_state");
    return response;
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    const response = NextResponse.json(
      { error: "Authentication required. Please sign in." },
      { status: 401 },
    );
    response.cookies.delete("github_install_state");
    return response;
  }

  if (
    !expectedState ||
    !returnedState ||
    !/^[a-f0-9]{64}$/.test(expectedState) ||
    !/^[a-f0-9]{64}$/.test(returnedState) ||
    !timingSafeEqual(
      Buffer.from(expectedState, "hex"),
      Buffer.from(returnedState, "hex"),
    )
  ) {
    const response = clearStateCookie();
    response.cookies.delete("github_install_state");
    return response;
  }

  if (!code || !installationId || !/^\d+$/.test(installationId)) {
    const response = clearStateCookie();
    response.cookies.delete("github_install_state");
    return response;
  }

  try {
    const clientId = process.env.GITHUB_APP_CLIENT_ID;
    const clientSecret = process.env.GITHUB_APP_CLIENT_SECRET;
    const appId = process.env.GITHUB_APP_ID;
    const privateKeyPath = process.env.GITHUB_APP_PRIVATE_KEY_PATH;

    if (!clientId || !clientSecret || !appId || !privateKeyPath) {
      throw new Error("GitHub App configuration is incomplete.");
    }

    // Exchange GitHub's one-time authorization code.
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
        }),
        cache: "no-store",
      },
    );

    if (!tokenResponse.ok) {
      throw new Error("GitHub token exchange failed.");
    }

    const tokenData = await tokenResponse.json();

    if (typeof tokenData.access_token !== "string" || tokenData.error) {
      throw new Error("GitHub did not issue an access token.");
    }

    // Confirm the GitHub account that authorized the app.
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "no-store",
    });

    if (!githubUserResponse.ok) {
      throw new Error("Could not verify the GitHub account.");
    }

    const githubUser = await githubUserResponse.json();

    if (typeof githubUser.id !== "number") {
      throw new Error("GitHub returned an invalid user identity.");
    }

    // Confirm the signed-in GitHub user can access this installation.
    const numericInstallationId = Number(installationId);

    if (!Number.isSafeInteger(numericInstallationId)) {
      throw new Error("Invalid GitHub installation ID.");
    }

    const userInstallationResponse = await fetch(
      `https://api.github.com/user/installations/${numericInstallationId}/repositories`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        cache: "no-store",
      },
    );

    if (!userInstallationResponse.ok) {
      throw new Error(
        "The authorizing GitHub user cannot access this installation.",
      );
    }

    // Authenticate as the GitHub App and independently verify the installation.
    const privateKey = await readFile(privateKeyPath, "utf8");

    const appAuth = createAppAuth({
      appId,
      privateKey,
      clientId,
      clientSecret,
    });

    const appAuthentication = await appAuth({ type: "app" });

    const appOctokit = new Octokit({
      auth: appAuthentication.token,
    });

    const installationResponse = await appOctokit.apps.getInstallation({
      installation_id: numericInstallationId,
    });

    if (installationResponse.data.id !== numericInstallationId) {
      throw new Error("GitHub installation could not be verified.");
    }

    // Never silently replace an existing GitHub connection.
    const existingConnection = await prisma.providerConnection.findUnique({
      where: {
        userId_provider: {
          userId: session.user.id,
          provider: "GITHUB",
        },
      },
    });

    if (
      existingConnection &&
      existingConnection.externalId !== String(numericInstallationId)
    ) {
      const response = NextResponse.json(
        {
          error:
            "A different GitHub installation is already connected. Disconnect it before connecting another installation.",
        },
        { status: 409 },
      );

      response.cookies.delete("github_install_state");
      return response;
    }

    // Save only the verified installation ID, not the OAuth access token.
    await prisma.providerConnection.upsert({
      where: {
        userId_provider: {
          userId: session.user.id,
          provider: "GITHUB",
        },
      },
      create: {
        userId: session.user.id,
        provider: "GITHUB",
        externalId: String(numericInstallationId),
      },
      update: {
        externalId: String(numericInstallationId),
      },
    });

    const response = NextResponse.json({
      message: "GitHub App installation verified and connected.",
      githubUsername: githubUser.login,
    });

    response.cookies.delete("github_install_state");
    return response;
  } catch (error) {
    console.error("GitHub connection failed:", {
      message: error instanceof Error ? error.message : "Unknown error",
    });

    const response = NextResponse.json(
      { error: "GitHub connection could not be completed." },
      { status: 500 },
    );

    response.cookies.delete("github_install_state");
    return response;
  }
}
