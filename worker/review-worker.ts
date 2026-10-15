import { Worker } from "bullmq";
import IORedis from "ioredis";
import "dotenv/config";
import { prisma } from "@/lib/prisma";
import { cloneRepository } from "./git";
import { createWorkspace, removeWorkspace } from "./workspace";
import { runSemgrep } from "./semgrep";
import { parseSemgrepResults } from "./semgrep-parser";
import { replaceFindings } from "./findings";
import { parsePackageLock } from "./npm-lock-parser";
import { findPackageLockFiles } from "./lockfile-discovery";
import { scanOsvPackages } from "./osv";

const connection = new IORedis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  "review",
  async (job) => {
    console.log(`Processing job: ${job.id}`);
    console.log(`Review ID: ${job.data.reviewId}`);

    const review = await prisma.review.findUnique({
      where: {
        id: job.data.reviewId,
      },
    });

    if (!review) {
      throw new Error(`Review ${job.data.reviewId} was not found.`);
    }

    try {
      await prisma.review.update({
        where: {
          id: job.data.reviewId,
        },
        data: {
          status: "RUNNING",
        },
      });

      console.log(`Review ${job.data.reviewId} is now RUNNING`);

      const workspace = await createWorkspace();

      try {
        console.log(`Workspace created: ${workspace}`);

        await cloneRepository(review.repositoryUrl, review.branch, workspace);
        console.log(`Repository cloned to: ${workspace}`);

        const lockfiles = await findPackageLockFiles(workspace);
        console.log(`Package lockfiles found: ${lockfiles.length}`);

        const osvFindings = [];
        let osvFailed = false;

        const osvRun = await prisma.scannerRun.create({
          data: {
            reviewId: review.id,
            scanner: "OSV",
            status: "RUNNING",
          },
        });

        for (const lockfilePath of lockfiles) {
          console.log(`Processing lockfile: ${lockfilePath}`);

          try {
            const dependencies = await parsePackageLock(lockfilePath);

            console.log(
              `NPM dependencies found in ${lockfilePath}: ${dependencies.length}`,
            );

            const lockfileFindings = await scanOsvPackages(dependencies);

            osvFindings.push(...lockfileFindings);

            console.log(
              `OSV findings from ${lockfilePath}: ${lockfileFindings.length}`,
            );
          } catch (error) {
            osvFailed = true;
            console.error(`OSV processing failed for ${lockfilePath}:`, error);
          }
        }

        const osvStatus = osvFailed ? "FAILED" : "COMPLETED";

        await prisma.scannerRun.update({
          where: {
            id: osvRun.id,
          },
          data: {
            status: osvStatus,
          },
        });

        console.log(`OSV scanner ${osvStatus}`);

        const semgrepFindings = [];
        let semgrepFailed = false;

        const semgrepRun = await prisma.scannerRun.create({
          data: {
            reviewId: review.id,
            scanner: "SEMGREP",
            status: "RUNNING",
          },
        });

        try {
          const semgrepOutput = await runSemgrep(workspace);
          console.log("Semgrep scan completed");

          const parsedFindings = parseSemgrepResults(semgrepOutput, workspace);
          semgrepFindings.push(...parsedFindings);

          console.log(`Semgrep findings: ${parsedFindings.length}`);

          await prisma.scannerRun.update({
            where: {
              id: semgrepRun.id,
            },
            data: {
              status: "COMPLETED",
            },
          });

          console.log("Semgrep scanner completed");
        } catch (error) {
          semgrepFailed = true;
          await prisma.scannerRun.update({
            where: {
              id: semgrepRun.id,
            },
            data: {
              status: "FAILED",
            },
          });

          console.error("Semgrep scan failed:", error);
        }

        const findings = [...osvFindings, ...semgrepFindings];
        console.log(`Total findings: ${findings.length}`);

        await replaceFindings(review.id, findings);
        console.log("Findings saved to database");

        const reviewStatus =
          osvFailed || semgrepFailed ? "FAILED" : "COMPLETED";

        await prisma.review.update({
          where: {
            id: job.data.reviewId,
          },
          data: {
            status: reviewStatus,
          },
        });

        console.log(`Review ${job.data.reviewId} is now ${reviewStatus}`);
      } finally {
        await removeWorkspace(workspace);
        console.log(`Workspace removed: ${workspace}`);
      }
    } catch (error) {
      await prisma.review.update({
        where: {
          id: job.data.reviewId,
        },
        data: {
          status: "FAILED",
        },
      });

      console.error(`Review ${job.data.reviewId} failed:`, error);
      throw error;
    }

    return {
      success: true,
    };
  },
  {
    connection,
  },
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, error) => {
  console.error(`Job ${job?.id} failed:`, error);
});

console.log("Review worker started");
