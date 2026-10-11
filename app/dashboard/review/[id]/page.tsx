"use client";

import Link from "next/link";
import NotFound from "@/components/NotFound";
import LoadingAnimation from "@/components/LoadingAnimation";
import FindingsSection from "./FindingsSection";
import { use, useEffect, useState } from "react";

type Finding = {
  id: string;
  source: string;
  ruleId: string | null;
  severity: string;
  message: string;
  filePath: string | null;
  startLine: number | null;
  endLine: number | null;
};

export default function ReviewResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [status, setStatus] = useState<
    "QUEUED" | "RUNNING" | "COMPLETED" | "FAILED"
  >("QUEUED");
  const statuses = ["QUEUED", "RUNNING", "COMPLETED"] as const;
  const [findings, setFindings] = useState<Finding[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;

    async function fetchReview() {
      try {
        const response = await fetch(`/api/reviews/${id}`);

        if (response.status === 404) {
          setNotFound(true);
          setIsLoading(false);
          if (intervalId) {
            clearInterval(intervalId);
          }
          return;
        }

        if (!response.ok) {
          throw new Error(
            `Unable to load review. Server returned ${response.status}.`,
          );
        }

        const data = await response.json();
        const reviewStatus = data.review.status;

        setStatus(reviewStatus);
        setFindings(data.review.findings ?? []);
        setError(null);
        setIsLoading(false);

        if (reviewStatus === "COMPLETED" || reviewStatus === "FAILED") {
          if (intervalId) {
            clearInterval(intervalId);
          }
        }
      } catch {
        setError(
          "Unable to load the review. Please check your connection and try again.",
        );
        setIsLoading(false);
        if (intervalId) {
          clearInterval(intervalId);
        }
      }
    }

    fetchReview();

    intervalId = setInterval(fetchReview, 2000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [id]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <LoadingAnimation message="Checking review…" />
      </main>
    );
  }

  if (notFound) {
    return <NotFound />;
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-white">
            Unable to Load Review
          </h1>

          <p className="mt-3 text-slate-400">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/dashboard/review"
          className="mb-6 inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
        >
          ← Back
        </Link>

        <h1 className="text-3xl font-bold text-white">Review Result</h1>

        <p className="mt-2 text-slate-400">
          Track the progress of your security review.
        </p>

        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-950 p-8">
          <h2 className="text-xl font-semibold text-white">Review Pipeline</h2>

          <div className="mt-8 flex flex-col items-center">
            {statuses.map((step, index) => {
              const displayStep =
                step === "COMPLETED" && status === "FAILED" ? "FAILED" : step;

              const isActive =
                step === status ||
                (step === "COMPLETED" && status === "FAILED");

              const isCompleted =
                status !== "FAILED" &&
                statuses.indexOf(step) < statuses.indexOf(status);

              return (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`flex h-16 w-56 items-center justify-center rounded-full border text-sm font-semibold ${
                      status === "FAILED" && isActive
                        ? "border-red-400 bg-red-500/20 text-red-300"
                        : status === "COMPLETED" && step === "COMPLETED"
                          ? "border-green-400 bg-green-500/20 text-green-300"
                          : isActive
                            ? "border-cyan-400 bg-cyan-500/20 text-cyan-300"
                            : isCompleted
                              ? "border-green-400 bg-green-500/20 text-green-300"
                              : "border-slate-700 bg-slate-900 text-slate-500"
                    }`}
                  >
                    {displayStep}
                  </div>

                  {index < statuses.length - 1 && (
                    <div className="my-2 text-xl text-slate-600">↓</div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
        <FindingsSection status={status} findings={findings} />
      </div>
    </main>
  );
}
