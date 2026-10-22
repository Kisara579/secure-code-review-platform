import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { decryptToken } from "@/lib/token-encryption";

type GitLabProject = {
  id: number;
  name: string;
  path_with_namespace: string;
  path: string;
  visibility: "private" | "internal" | "public";
  default_branch: string | null;
  web_url: string;
  last_activity_at: string | null;
};

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

  try {
    const connection = await prisma.providerConnection.findUnique({
      where: {
        userId_provider: {
          userId: session.user.id,
          provider: "GITLAB",
        },
      },
      select: {
        accessTokenEncrypted: true,
      },
    });

    if (!connection?.accessTokenEncrypted) {
      return NextResponse.json(
        { error: "Connect your GitLab account first." },
        { status: 404 },
      );
    }

    const accessToken = decryptToken(connection.accessTokenEncrypted);
    const projects: GitLabProject[] = [];
    const perPage = 100;
    let page = 1;

    while (true) {
      const response = await fetch(
        `https://gitlab.com/api/v4/projects?membership=true&simple=true&order_by=last_activity_at&sort=desc&per_page=${perPage}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          cache: "no-store",
          signal: AbortSignal.timeout(15_000),
        },
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          return NextResponse.json(
            {
              error:
                "GitLab authorization has expired or lacks permission. Reconnect your GitLab account.",
            },
            { status: 401 },
          );
        }

        throw new Error(`GitLab API returned status ${response.status}.`);
      }

      const batch = (await response.json()) as GitLabProject[];

      projects.push(...batch);

      if (batch.length < perPage) {
        break;
      }

      page += 1;
    }

    return NextResponse.json({
      repositories: projects.map((project) => ({
        id: project.id,
        name: project.name,
        fullName: project.path_with_namespace,
        owner: project.path_with_namespace.split("/")[0],
        private: project.visibility === "private",
        defaultBranch: project.default_branch,
        htmlUrl: project.web_url,
        pushedAt: project.last_activity_at,
      })),
    });
  } catch (error) {
    console.error("Failed to load GitLab repositories:", {
      message: error instanceof Error ? error.message : "Unknown error",
    });

    return NextResponse.json(
      { error: "Unable to load GitLab repositories. Please try again." },
      { status: 500 },
    );
  }
}
