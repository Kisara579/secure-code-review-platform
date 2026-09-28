import { Worker } from "bullmq";
import IORedis from "ioredis";
import "dotenv/config";

const connection = new IORedis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  "review",
  async (job) => {
    console.log(`Processing job: ${job.id}`);
    console.log(`Review ID: ${job.data.reviewId}`);

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