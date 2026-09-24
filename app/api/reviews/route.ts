export async function POST(request: Request) {
    const body = await request.json();

    if (
  typeof body.repository !== "string" ||
  typeof body.branch !== "string"   ) {
  return Response.json(
    {
      error: "Repository and branch must be strings.",
    },
    {
      status: 400,
    }
  );
 }
    if (!body.repository || !body.branch) {
    return Response.json(
      {
        error: "Repository and branch are required.",
      },
      {
        status: 400,
      }
    );
  }
  
 if (!body.repository.trim() || !body.branch.trim()) {
  return Response.json(
    {
      error: "Repository and branch cannot be empty.",
    },
    {
      status: 400,
    }
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
      }
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
      }
    );
  }
 } catch {
  return Response.json(
    {
      error: "Invalid repository URL.",
    },
    {
      status: 400,
    }
  );
 }

    return Response.json({
        message:"Review request received",
        data:body,
    });
}