"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function ReviewResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [status, setStatus] = useState<"QUEUED" | "RUNNING" | "COMPLETED">(
    "QUEUED",
  );
  const statuses = ["QUEUED", "RUNNING", "COMPLETED"] as const;

  useEffect(() => {
    async function fetchReview() {
      const response = await fetch(`/api/reviews/${id}`);
      const data = await response.json();

      if (response.ok) {
        setStatus(data.review.status);
      }
    }

    fetchReview();
  }, [id]);

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
              const isActive = step === status;
              const isCompleted =
                statuses.indexOf(step) < statuses.indexOf(status);

              return (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`flex h-16 w-56 items-center justify-center rounded-full border text-sm font-semibold ${
                      isActive
                        ? "border-cyan-400 bg-cyan-500/20 text-cyan-300"
                        : isCompleted
                          ? "border-green-400 bg-green-500/20 text-green-300"
                          : "border-slate-700 bg-slate-900 text-slate-500"
                    }`}
                  >
                    {step}
                  </div>

                  {index < statuses.length - 1 && (
                    <div className="my-2 text-xl text-slate-600">↓</div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
