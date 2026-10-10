import { prisma } from "@/lib/prisma";
import type { NormalizedFinding } from "./finding";

export async function replaceFindings(
  reviewId: string,
  findings: NormalizedFinding[],
): Promise<void> {
  await prisma.finding.deleteMany({
    where: {
      reviewId,
    },
  });

  if (findings.length === 0) {
    return;
  }

  await prisma.finding.createMany({
    data: findings.map((finding) => ({
      reviewId,
      source: finding.source,
      ruleId: finding.ruleId,
      severity: finding.severity,
      message: finding.message,
      filePath: finding.filePath,
      startLine: finding.startLine,
      endLine: finding.endLine,
      details: finding.details
        ? JSON.parse(JSON.stringify(finding.details))
        : undefined,
    })),
  });
}