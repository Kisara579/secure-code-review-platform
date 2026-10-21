import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getGitHubInstallationOctokit } from "@/lib/github-app";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json(
      { error: "Authentication required. Please sign in." },
      { status: 401 },
    );
  }

  const connection = await prisma.providerConnection.findUnique({
    where: {
      userId_provider: {
        userId: session.user.id,
        provider: "GITHUB",
      },
    },
  });

  if (!connection) {
    return NextResponse.json(
      { error: "Connect your GitHub account first." },
      { status: 404 },
    );
  }

  const installationId = Number(connection.externalId);

  if (!Number.isSafeInteger(installationId) || installationId <= 0) {
    return NextResponse.json(
      { error: "The saved GitHub installation is invalid." },
      { status: 500 },
    );
  }

  try {
    const octokit = await getGitHubInstallationOctokit(installationId);

    const repositories = await octokit.paginate(
      octokit.apps.listReposAccessibleToInstallation,
      {
        per_page: 100,
        sort: "pushed",
        direction: "desc",
      },
      (response) =>
        response.data.map((repository) => ({
          id: repository.id,
          name: repository.name,
          fullName: repository.full_name,
          owner: repository.owner.login,
          private: repository.private,
          defaultBranch: repository.default_branch,
          htmlUrl: repository.html_url,
          pushedAt: repository.pushed_at,
        })),
    );

    return NextResponse.json({ repositories });
  } catch (error) {
    console.error("Failed to list GitHub repositories:", {
      message: error instanceof Error ? error.message : "Unknown error",
    });

    return NextResponse.json(
      { error: "Unable to retrieve GitHub repositories." },
      { status: 502 },
    );
  }
}
