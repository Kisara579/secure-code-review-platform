import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json(
      { error: "Authentication required. Please sign in." },
      { status: 401 },
    );
  }

  const { id } = await params;

  const review = await prisma.review.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
    include: {
      scannerRuns: true,
      findings: true,
    },
  });

  if (!review) {
    return Response.json(
      {
        error: "Review not found.",
      },
      {
        status: 404,
      },
    );
  }

  return Response.json({
    review,
  });
}
