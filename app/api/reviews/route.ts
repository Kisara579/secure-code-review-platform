import { prisma } from "@/lib/prisma";
import { reviewQueue } from "@/lib/queue";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { verifyGitRepositoryAndBranch } from "@/lib/git-verify";
import { getGitHubInstallationOctokit } from "@/lib/github-app";
import { decryptToken } from "@/lib/token-encryption";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json(
      { error: "Authentication required. Please sign in." },
      { status: 401 },
    );
  }

  const reviews = await prisma.review.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          findings: true,
        },
      },
    },
  });

  return Response.json({
    reviews,
  });
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json(
      { error: "Authentication required. Please sign in." },
      { status: 401 },
    );
  }

  let body;
  let provider: "github" | "gitlab";
  let owner: string;
  let repositoryName: string;
  let review;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      {
        error: "Invalid JSON in request body.",
      },
      {
        status: 400,
      },
    );
  }

  if (typeof body.repository !== "string" || typeof body.branch !== "string") {
    return Response.json(
      {
        error: "Repository and branch must be strings.",
      },
      {
        status: 400,
      },
    );
  }
  if (!body.repository || !body.branch) {
    return Response.json(
      {
        error: "Repository and branch are required.",
      },
      {
        status: 400,
      },
    );
  }

  if (!body.repository.trim() || !body.branch.trim()) {
    return Response.json(
      {
        error: "Repository and branch cannot be empty.",
      },
      {
        status: 400,
      },
    );
  }

  try {
    const url = new URL(body.repository);

    if (url.hostname !== "github.com" && url.hostname !== "gitlab.com") {
      return Response.json(
        {
          error: "Only GitHub or GitLab repositories are supported.",
        },
        {
          status: 400,
        },
      );
    }

    const pathParts = url.pathname.split("/").filter(Boolean);

    const isGitHub = url.hostname === "github.com";
    const isGitLab = url.hostname === "gitlab.com";

    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.port ||
      (!isGitHub && !isGitLab)
    ) {
      return Response.json(
        { error: "Only HTTPS GitHub or GitLab repository URLs are supported." },
        { status: 400 },
      );
    }

    const normalizedPath = pathParts.map((part, index) =>
      index === pathParts.length - 1 ? part.replace(/\.git$/i, "") : part,
    );

    if (
      (isGitHub && normalizedPath.length !== 2) ||
      (isGitLab && normalizedPath.length < 2) ||
      normalizedPath.some((part) => !part || part === "." || part === "..")
    ) {
      return Response.json(
        { error: "Please enter a valid repository URL." },
        { status: 400 },
      );
    }

    provider = isGitHub ? "github" : "gitlab";
    repositoryName = normalizedPath[normalizedPath.length - 1];
    owner = normalizedPath.slice(0, -1).join("/");
  } catch {
    return Response.json(
      {
        error: "Invalid repository URL.",
      },
      {
        status: 400,
      },
    );
  }

  const repositoryUrl = body.repository.trim();
  const branch = body.branch.trim();

  if (body.githubRepositoryId !== undefined) {
    if (
      typeof body.githubRepositoryId !== "number" ||
      !Number.isSafeInteger(body.githubRepositoryId) ||
      body.githubRepositoryId <= 0
    ) {
      return Response.json(
        { error: "Invalid GitHub repository ID." },
        { status: 400 },
      );
    }

    if (provider !== "github") {
      return Response.json(
        { error: "GitHub repository verification requires a GitHub URL." },
        { status: 400 },
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
      return Response.json(
        { error: "Connect your GitHub account first." },
        { status: 403 },
      );
    }

    const installationId = Number(connection.externalId);

    if (!Number.isSafeInteger(installationId) || installationId <= 0) {
      return Response.json(
        { error: "The saved GitHub installation is invalid." },
        { status: 500 },
      );
    }

    try {
      const octokit = await getGitHubInstallationOctokit(installationId);

      const repositoryResponse = await octokit.rest.repos.get({
        owner,
        repo: repositoryName,
      });

      if (repositoryResponse.data.id !== body.githubRepositoryId) {
        return Response.json(
          {
            error:
              "The selected repository does not match the requested repository.",
            reason: "REPO_NOT_FOUND",
          },
          { status: 403 },
        );
      }

      try {
        await octokit.rest.repos.getBranch({
          owner,
          repo: repositoryName,
          branch,
        });
      } catch (error) {
        if (
          typeof error === "object" &&
          error !== null &&
          "status" in error &&
          error.status === 404
        ) {
          return Response.json(
            {
              error: `Branch "${branch}" does not exist in this repository.`,
              reason: "BRANCH_NOT_FOUND",
            },
            { status: 400 },
          );
        }

        throw error;
      }
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        error.status === 404
      ) {
        return Response.json(
          {
            error:
              "Repository not found or inaccessible through your GitHub App installation.",
            reason: "REPO_NOT_FOUND",
          },
          { status: 400 },
        );
      }

      console.error("GitHub repository verification failed:", {
        message: error instanceof Error ? error.message : "Unknown error",
      });

      return Response.json(
        { error: "Unable to verify the repository through GitHub." },
        { status: 502 },
      );
    }
  } else if (provider === "gitlab" && body.source === "gitlab") {
    const gitlabConnection = await prisma.providerConnection.findUnique({
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

    if (!gitlabConnection?.accessTokenEncrypted) {
      return Response.json(
        { error: "Connect your GitLab account first." },
        { status: 403 },
      );
    }

    try {
      const accessToken = decryptToken(gitlabConnection.accessTokenEncrypted);

      const apiBase = "https://gitlab.com/api/v4";
      const projectPath = encodeURIComponent(
        normalizedGitLabProjectPath(repositoryUrl),
      );

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const projectResponse = await fetch(
        `${apiBase}/projects/${projectPath}`,
        {
          headers,
          cache: "no-store",
          signal: AbortSignal.timeout(15_000),
        },
      );

      if (projectResponse.status === 404) {
        return Response.json(
          {
            error:
              "Repository not found or inaccessible to your GitLab account.",
            reason: "REPO_NOT_FOUND",
          },
          { status: 400 },
        );
      }

      if (projectResponse.status === 401 || projectResponse.status === 403) {
        return Response.json(
          { error: "GitLab authorization is invalid or lacks permission." },
          { status: 403 },
        );
      }

      if (!projectResponse.ok) {
        throw new Error(
          `GitLab project verification returned status ${projectResponse.status}.`,
        );
      }

      const project = (await projectResponse.json()) as {
        id: number;
        path_with_namespace: string;
      };

      const requestedPath = decodeURIComponent(projectPath).replace(
        /\.git$/i,
        "",
      );

      if (project.path_with_namespace !== requestedPath) {
        return Response.json(
          {
            error:
              "The GitLab repository path does not match the requested repository.",
          },
          { status: 400 },
        );
      }

      const branchResponse = await fetch(
        `${apiBase}/projects/${project.id}/repository/branches/${encodeURIComponent(branch)}`,
        {
          headers,
          cache: "no-store",
          signal: AbortSignal.timeout(15_000),
        },
      );

      if (branchResponse.status === 404) {
        return Response.json(
          {
            error: `Branch "${branch}" does not exist or is inaccessible in this repository.`,
            reason: "BRANCH_NOT_FOUND",
          },
          { status: 400 },
        );
      }

      if (!branchResponse.ok) {
        throw new Error(
          `GitLab branch verification returned status ${branchResponse.status}.`,
        );
      }
    } catch (error) {
      console.error("GitLab repository verification failed:", {
        message: error instanceof Error ? error.message : "Unknown error",
      });

      return Response.json(
        { error: "Unable to verify the repository through GitLab." },
        { status: 502 },
      );
    }
  } else {
    const verification = await verifyGitRepositoryAndBranch(
      repositoryUrl,
      branch,
    );

    if (!verification.valid) {
      return Response.json(
        {
          error: verification.error,
          reason: verification.reason,
        },
        { status: 400 },
      );
    }
  }

  try {
    review = await prisma.review.create({
      data: {
        provider,
        owner,
        repositoryName,
        repositoryUrl,
        branch,
        status: "QUEUED",
        userId: session.user.id,
      },
    });
  } catch (error) {
    console.error("Failed to create review:", {
      name: error instanceof Error ? error.name : typeof error,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return Response.json(
      {
        error: "Failed to create review in the database.",
      },
      {
        status: 500,
      },
    );
  }

  try {
    await reviewQueue.add("review", {
      reviewId: review.id,
    });
  } catch {
    try {
      await prisma.review.update({
        where: {
          id: review.id,
        },
        data: {
          status: "FAILED",
        },
      });
    } catch {
      // Database update failed; the original queue error is still the primary failure.
    }

    return Response.json(
      {
        error: "Failed to queue the review for processing.",
      },
      {
        status: 500,
      },
    );
  }

  return Response.json({
    message: "Review request received",
    data: {
      reviewId: review.id,
      provider,
      owner,
      repositoryName,
      repositoryUrl,
      branch,
      status: review.status,
    },
  });
}
function normalizedGitLabProjectPath(repositoryUrl: string): string {
  const url = new URL(repositoryUrl);

  return url.pathname
    .split("/")
    .filter(Boolean)
    .join("/")
    .replace(/\.git$/i, "");
}
