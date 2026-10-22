import { timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { encryptToken } from "@/lib/token-encryption";

type GitLabTokenResponse = {
  access_token?: unknown;
  refresh_token?: unknown;
  expires_in?: unknown;
  error?: unknown;
};

type GitLabUser = {
  id?: unknown;
  username?: unknown;
};

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const expectedState = cookieStore.get("gitlab_repository_state")?.value;
  const url = new URL(request.url);

  const returnedState = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  const oauthError = url.searchParams.get("error");

  const failure = (message: string, status = 400) => {
    const response = NextResponse.json({ error: message }, { status });
    response.cookies.delete("gitlab_repository_state");
    return response;
  };

  if (oauthError) {
    return failure("GitLab authorization was not completed.");
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return failure("Authentication required. Please sign in.", 401);
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
    return failure("GitLab authorization state validation failed.");
  }

  if (!code) {
    return failure("GitLab did not return an authorization code.");
  }

  try {
    const clientId = process.env.GITLAB_REPOSITORY_CLIENT_ID;
    const clientSecret = process.env.GITLAB_REPOSITORY_CLIENT_SECRET;
    const redirectUri = process.env.GITLAB_REPOSITORY_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
      throw new Error("GitLab OAuth configuration is incomplete.");
    }

    const tokenResponse = await fetch("https://gitlab.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      }),
      cache: "no-store",
    });

    if (!tokenResponse.ok) {
      throw new Error("GitLab token exchange failed.");
    }

    const tokenData = (await tokenResponse.json()) as GitLabTokenResponse;

    if (
      typeof tokenData.access_token !== "string" ||
      !tokenData.access_token ||
      tokenData.error
    ) {
      throw new Error("GitLab did not issue an access token.");
    }

    const userResponse = await fetch("https://gitlab.com/api/v4/user", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
      cache: "no-store",
    });

    if (!userResponse.ok) {
      throw new Error("Could not verify the GitLab account.");
    }

    const gitlabUser = (await userResponse.json()) as GitLabUser;

    if (
      typeof gitlabUser.id !== "number" ||
      !Number.isSafeInteger(gitlabUser.id) ||
      gitlabUser.id <= 0
    ) {
      throw new Error("GitLab returned an invalid user identity.");
    }

    const externalId = String(gitlabUser.id);

    const existingConnection = await prisma.providerConnection.findUnique({
      where: {
        userId_provider: {
          userId: session.user.id,
          provider: "GITLAB",
        },
      },
    });

    if (existingConnection && existingConnection.externalId !== externalId) {
      return failure(
        "A different GitLab account is already connected. Disconnect it before connecting another account.",
        409,
      );
    }

    const encryptedAccessToken = encryptToken(tokenData.access_token);

    const encryptedRefreshToken =
      typeof tokenData.refresh_token === "string" && tokenData.refresh_token
        ? encryptToken(tokenData.refresh_token)
        : null;

    await prisma.providerConnection.upsert({
      where: {
        userId_provider: {
          userId: session.user.id,
          provider: "GITLAB",
        },
      },
      create: {
        userId: session.user.id,
        provider: "GITLAB",
        externalId,
        accessTokenEncrypted: encryptedAccessToken,
        refreshTokenEncrypted: encryptedRefreshToken,
      },
      update: {
        accessTokenEncrypted: encryptedAccessToken,
        refreshTokenEncrypted: encryptedRefreshToken,
      },
    });

    const response = NextResponse.json({
      message: "GitLab account connected successfully.",
      gitlabUsername:
        typeof gitlabUser.username === "string"
          ? gitlabUser.username
          : undefined,
    });

    response.cookies.delete("gitlab_repository_state");
    return response;
  } catch (error) {
    console.error("GitLab connection failed:", {
      message: error instanceof Error ? error.message : "Unknown error",
    });

    return failure("GitLab connection could not be completed.", 500);
  }
}
