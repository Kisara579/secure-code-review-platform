"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Clock,
  ExternalLink,
  GitBranch,
  History,
  ShieldAlert,
  RefreshCw,
  Trash2,
} from "lucide-react";

type Review = {
  id: string;
  provider: string;
  owner: string;
  repositoryName: string;
  repositoryUrl: string;
  branch: string;
  status: "QUEUED" | "RUNNING" | "COMPLETED" | "FAILED";
  createdAt: string;
  _count: {
    findings: number;
  };
};

export default function ReviewHistoryPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState("");
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);

  async function handleDeleteReview(review: Review) {
    setDeletingId(review.id);
    setDeleteError("");

    try {
      const response = await fetch(`/api/reviews/${review.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to delete this review.");
      }

      setReviews((currentReviews) =>
        currentReviews.filter((item) => item.id !== review.id),
      );

      setReviewToDelete(null);
      setDeleteError("");
    } catch (error) {
      setDeleteError(
        error instanceof Error
          ? error.message
          : "Unable to delete this review. Please try again.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    async function loadReviews() {
      try {
        const response = await fetch("/api/reviews");

        if (!response.ok) {
          throw new Error("Unable to retrieve reviews.");
        }

        const data = await response.json();
        const nextReviews: Review[] = data.reviews ?? [];

        if (cancelled) return;

        setReviews(nextReviews);
        setError("");

        const hasProcessingReviews = nextReviews.some(
          (review) => review.status === "QUEUED" || review.status === "RUNNING",
        );

        if (hasProcessingReviews) {
          timeoutId = setTimeout(() => {
            void loadReviews();
          }, 5000);
        }
      } catch {
        if (!cancelled) {
          setError("Unable to load review history. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadReviews();

    return () => {
      cancelled = true;

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  function statusStyle(status: Review["status"]) {
    switch (status) {
      case "COMPLETED":
        return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
      case "RUNNING":
        return "border-cyan-500/30 bg-cyan-500/10 text-cyan-400";
      case "FAILED":
        return "border-red-500/30 bg-red-500/10 text-red-400";
      default:
        return "border-amber-500/30 bg-amber-500/10 text-amber-400";
    }
  }

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <History className="h-7 w-7 text-cyan-400" />
              <h1 className="text-3xl font-bold text-white">Review History</h1>
            </div>
            <p className="mt-2 text-slate-400">
              Browse your submitted code reviews and inspect their results.
            </p>
          </div>

          <Link
            href="/dashboard/review"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
          >
            Start New Review
          </Link>
        </div>

        {deleteError && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            {deleteError}
          </div>
        )}

        {isLoading ? (
          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center text-slate-400">
            <Clock className="mx-auto mb-3 h-7 w-7 animate-pulse text-cyan-400" />
            Loading your reviews...
          </div>
        ) : error ? (
          <div
            role="alert"
            className="mt-10 rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center"
          >
            <ShieldAlert className="mx-auto mb-3 h-7 w-7 text-red-400" />
            <p className="text-red-300">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm text-white hover:bg-slate-800"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
          </div>
        ) : reviews.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center">
            <History className="mx-auto mb-4 h-10 w-10 text-slate-500" />
            <h2 className="text-xl font-semibold text-white">No reviews yet</h2>
            <p className="mt-2 text-slate-400">
              Your submitted code reviews will appear here.
            </p>
            <Link
              href="/dashboard/review"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
            >
              Start Your First Review
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            <p className="text-sm text-slate-400">
              {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
            </p>

            {reviews.map((review) => (
              <article
                key={review.id}
                className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 transition-colors hover:border-slate-700 sm:p-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="break-all text-lg font-semibold text-white">
                        {review.owner}/{review.repositoryName}
                      </h2>
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle(review.status)}`}
                      >
                        {review.status}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
                      <span className="inline-flex items-center gap-2">
                        <GitBranch className="h-4 w-4" />
                        {review.branch}
                      </span>
                      <span>
                        Submitted {new Date(review.createdAt).toLocaleString()}
                      </span>
                      <span>
                        {review._count.findings}{" "}
                        {review._count.findings === 1 ? "finding" : "findings"}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-3">
                    <a
                      href={review.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                    >
                      Repository
                      <ExternalLink className="h-4 w-4" />
                    </a>

                    <Link
                      href={`/dashboard/review/${review.id}`}
                      className="inline-flex items-center justify-center rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400"
                    >
                      View Results
                    </Link>

                    <button
                      type="button"
                      onClick={() => setReviewToDelete(review)}
                      disabled={
                        (review.status !== "COMPLETED" &&
                          review.status !== "FAILED") ||
                        deletingId !== null
                      }
                      title={
                        review.status === "QUEUED" ||
                        review.status === "RUNNING"
                          ? "Wait until the review finishes before deleting it."
                          : "Delete this review"
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-500/30 px-4 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
                    >
                      <Trash2 className="h-4 w-4" />
                      {deletingId === review.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {reviewToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => {
            if (deletingId === null) setReviewToDelete(null);
          }}
        >
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-review-title"
            aria-describedby="delete-review-description"
            className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl shadow-black/40"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10">
              <Trash2 className="h-6 w-6 text-red-400" />
            </div>

            <h2
              id="delete-review-title"
              className="text-xl font-semibold text-white"
            >
              Delete review?
            </h2>

            <p
              id="delete-review-description"
              className="mt-3 text-sm leading-6 text-slate-400"
            >
              Are you sure you want to delete{" "}
              <span className="font-medium text-white">
                {reviewToDelete.owner}/{reviewToDelete.repositoryName}
              </span>
              ? This will permanently remove the review and its associated
              findings and scanner-run records.
            </p>

            {deleteError && (
              <p role="alert" className="mt-4 text-sm text-red-300">
                {deleteError}
              </p>
            )}

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                disabled={deletingId !== null}
                onClick={() => {
                  setReviewToDelete(null);
                  setDeleteError("");
                }}
                className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deletingId !== null}
                onClick={() => void handleDeleteReview(reviewToDelete)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
                {deletingId === reviewToDelete.id
                  ? "Deleting..."
                  : "Delete review"}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
