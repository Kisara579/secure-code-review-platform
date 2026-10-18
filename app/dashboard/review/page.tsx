"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingAnimation from "@/components/LoadingAnimation";
import { ArrowLeft, GitBranch, Globe, AlertCircle } from "lucide-react";

export default function ReviewPage() {
  const [repository, setRepository] = useState("");
  const [branch, setBranch] = useState("");
  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState<"repository" | "branch" | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!repository.trim() && !branch.trim()) {
      setError("Please enter both repository URL and branch.");
      setErrorField("repository");
      return;
    }

    if (!repository.trim()) {
      setError("Please enter a repository URL.");
      setErrorField("repository");
      return;
    }

    if (!branch.trim()) {
      setError("Please enter a branch name.");
      setErrorField("branch");
      return;
    }

    try {
      const url = new URL(repository.trim());
      const pathParts = url.pathname.split("/").filter(Boolean);

      if (url.hostname !== "github.com" && url.hostname !== "gitlab.com") {
        setError("Please enter a GitHub or GitLab repository URL.");
        setErrorField("repository");
        return;
      }

      if (pathParts.length !== 2) {
        setError("Please enter a valid repository URL (e.g. https://github.com/owner/repo).");
        setErrorField("repository");
        return;
      }
    } catch {
      setError("Please enter a valid repository URL (e.g. https://github.com/owner/repo).");
      setErrorField("repository");
      return;
    }

    setError("");
    setErrorField(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repository: repository.trim(),
          branch: branch.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Failed to start review.");
        if (data.reason === "REPO_NOT_FOUND") {
          setErrorField("repository");
        } else if (data.reason === "BRANCH_NOT_FOUND") {
          setErrorField("branch");
        } else {
          setErrorField(null);
        }
        setIsSubmitting(false);
        return;
      }

      const newReviewId = data.data.reviewId;
      setRepository("");
      setBranch("");
      setErrorField(null);

      router.push(`/dashboard/review/${newReviewId}`);
    } catch {
      setError("Something went wrong while verifying. Please check your network and try again.");
      setErrorField(null);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isSubmitting && (
        <LoadingAnimation
          message="Verifying repository and branch… Please wait."
          fullScreen
        />
      )}

      <div className="px-6 py-10">
        <div className="mx-auto max-w-3xl">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="group mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-400"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Dashboard
          </button>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-8 backdrop-blur-sm">
            <h1 className="text-2xl font-bold text-white">Start Code Review</h1>
            <p className="mt-2 text-slate-400">
              Provide your repository information to begin a secure code review.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="repository"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Repository URL
                </label>
                <div className="relative">
                  <Globe className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="repository"
                    name="repository"
                    type="url"
                    placeholder="https://github.com/username/repository"
                    value={repository}
                    onChange={(event) => {
                      setRepository(event.target.value);
                      if (errorField === "repository") {
                        setErrorField(null);
                        setError("");
                      }
                    }}
                    disabled={isSubmitting}
                    className={`w-full rounded-xl border bg-slate-950/80 py-3 pl-10 pr-4 text-white outline-none transition-all placeholder:text-slate-600 disabled:opacity-50 ${
                      errorField === "repository"
                        ? "border-red-500/80 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-slate-700/80 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="branch"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Branch
                </label>
                <div className="relative">
                  <GitBranch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="branch"
                    name="branch"
                    type="text"
                    placeholder="main"
                    value={branch}
                    onChange={(event) => {
                      setBranch(event.target.value);
                      if (errorField === "branch") {
                        setErrorField(null);
                        setError("");
                      }
                    }}
                    disabled={isSubmitting}
                    className={`w-full rounded-xl border bg-slate-950/80 py-3 pl-10 pr-4 text-white outline-none transition-all placeholder:text-slate-600 disabled:opacity-50 ${
                      errorField === "branch"
                        ? "border-red-500/80 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-slate-700/80 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                    }`}
                  />
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-xl hover:shadow-cyan-500/30 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-lg disabled:hover:brightness-100"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Verifying & Starting…
                  </span>
                ) : (
                  "Start Review"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
