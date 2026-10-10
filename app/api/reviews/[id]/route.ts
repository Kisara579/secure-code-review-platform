import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  console.log("Requested review ID:", id);

  const review = await prisma.review.findUnique({
    where: {
      id,
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
