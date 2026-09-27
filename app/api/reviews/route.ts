import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
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

    if (pathParts.length !== 2) {
      return Response.json(
        {
          error: "Please enter a valid repository URL.",
        },
        {
          status: 400,
        },
      );
    }

    provider = url.hostname === "github.com" ? "github" : "gitlab";
    owner = pathParts[0];
    repositoryName = pathParts[1];
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
  try {
     review = await prisma.review.create({
      data: {
        provider,
        owner,
        repositoryName,
        repositoryUrl,
        branch,
        status: "QUEUED",
      },
    });
  } catch {
    return Response.json(
      {
        error: "Failed to create review in the database.",
      },
      {
        status: 500,
      }
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
