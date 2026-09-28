import { Worker } from "bullmq";
import IORedis from "ioredis";
import "dotenv/config";
import { prisma } from "@/lib/prisma";

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

    console.log(`Repository: ${review.repositoryUrl}`);
    console.log(`Branch: ${review.branch}`);

    await prisma.review.update({
      where: {
        id: job.data.reviewId,
      },
      data: {
        status: "RUNNING",
      },
    });

    console.log(`Review ${job.data.reviewId} is now RUNNING`);

    await prisma.review.update({
      where: {
        id: job.data.reviewId,
      },
      data: {
        status: "COMPLETED",
      },
    });

    console.log(`Review ${job.data.reviewId} is now COMPLETED`);
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
