"use client";

import Link from "next/link";
import NotFound from "@/components/NotFound";
import LoadingAnimation from "@/components/LoadingAnimation";
import FindingsSection from "./FindingsSection";
import { use, useEffect, useState } from "react";
import {
  ArrowLeft,
  Clock,
  Activity,
  CheckCircle2,
  XCircle,
  Terminal,
  ShieldAlert,
  RefreshCw,
  Layers,
} from "lucide-react";

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

type ScannerRun = {
  id: string;
  scanner: "OSV" | "SEMGREP";
  status: "RUNNING" | "COMPLETED" | "FAILED";
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
  const [scannerRuns, setScannerRuns] = useState<ScannerRun[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;

    async function fetchReview() {
      try {
        const response = await fetch(`/api/reviews/${id}`);

        if (response.status === 404) {
          setNotFound(true);
          setIsLoading(false);
          if (intervalId) clearInterval(intervalId);
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
        setScannerRuns(data.review.scannerRuns ?? []);
        setError(null);
        setIsLoading(false);

        if (reviewStatus === "COMPLETED" || reviewStatus === "FAILED") {
          if (intervalId) clearInterval(intervalId);
        }
      } catch {
        setError(
          "Unable to load the review. Please check your connection and try again.",
        );
        setIsLoading(false);
      }
    }

    intervalId = setInterval(fetchReview, 2000);
    fetchReview();

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [id]);

  if (isLoading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6">
        <LoadingAnimation message="Fetching review status & telemetry…" />
      </main>
    );
  }

  if (notFound) {
    return <NotFound />;
  }

  if (error) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="max-w-md rounded-2xl border border-red-500/20 bg-slate-900/60 p-8 text-center backdrop-blur-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold text-white">
            Unable to Load Review
          </h1>
          <p className="mt-2 text-sm text-slate-400">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:brightness-110"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      </main>
    );
  }

  const getStatusBadge = () => {
    switch (status) {
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Completed
          </span>
        );
      case "RUNNING":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
            Running
          </span>
        );
      case "FAILED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
            Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Queued
          </span>
        );
    }
  };

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Navigation & Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/dashboard/review"
              className="group mb-4 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-400"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              Back to Reviews
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Review Result
              </h1>
              {getStatusBadge()}
            </div>
            <p className="mt-1 font-mono text-xs text-slate-500">ID: {id}</p>
          </div>
        </div>

        {/* Pipeline Stepper */}
        <section className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 sm:p-8 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-6">
            <Layers className="h-5 w-5 text-cyan-400" />
            <h2 className="text-lg font-semibold text-white">
              Review Pipeline
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {statuses.map((step, index) => {
              const displayStep =
                step === "COMPLETED" && status === "FAILED" ? "FAILED" : step;

              const isCurrent =
                step === status ||
                (step === "COMPLETED" && status === "FAILED");

              const isFinished =
                status !== "FAILED" &&
                statuses.indexOf(step) < statuses.indexOf(status);

              const getStepIcon = () => {
                if (displayStep === "FAILED") {
                  return <XCircle className="h-5 w-5 text-red-400" />;
                }
                if (
                  isFinished ||
                  (step === "COMPLETED" && status === "COMPLETED")
                ) {
                  return <CheckCircle2 className="h-5 w-5 text-emerald-400" />;
                }
                if (isCurrent && status === "RUNNING") {
                  return (
                    <Activity className="h-5 w-5 text-cyan-400 animate-pulse" />
                  );
                }
                return <Clock className="h-5 w-5 text-slate-500" />;
              };

              return (
                <div
                  key={step}
                  className={`relative flex items-center gap-4 rounded-xl border p-4 transition-all ${
                    displayStep === "FAILED"
                      ? "border-red-500/40 bg-red-500/10 text-red-300"
                      : isFinished ||
                          (step === "COMPLETED" && status === "COMPLETED")
                        ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-300"
                        : isCurrent
                          ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-200 shadow-lg shadow-cyan-500/10"
                          : "border-slate-800 bg-slate-950/50 text-slate-500"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                      displayStep === "FAILED"
                        ? "bg-red-500/20"
                        : isFinished ||
                            (step === "COMPLETED" && status === "COMPLETED")
                          ? "bg-emerald-500/20"
                          : isCurrent
                            ? "bg-cyan-500/20"
                            : "bg-slate-800"
                    }`}
                  >
                    {getStepIcon()}
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Step 0{index + 1}
                    </span>
                    <p className="font-semibold">{displayStep}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Scanner Runs */}
        <section className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 sm:p-8 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-6">
            <Terminal className="h-5 w-5 text-cyan-400" />
            <h2 className="text-lg font-semibold text-white">
              Scanner Engine Status
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {(["OSV", "SEMGREP"] as const).map((scanner) => {
              const scannerRun = scannerRuns.find(
                (run) => run.scanner === scanner,
              );
              const scannerStatus = scannerRun?.status ?? "PENDING";

              const getStatusBadgeClass = () => {
                switch (scannerStatus) {
                  case "COMPLETED":
                    return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
                  case "FAILED":
                    return "border-red-500/30 bg-red-500/10 text-red-400";
                  case "RUNNING":
                    return "border-cyan-500/30 bg-cyan-500/10 text-cyan-400 animate-pulse";
                  default:
                    return "border-slate-700 bg-slate-800/60 text-slate-400";
                }
              };

              return (
                <div
                  key={scanner}
                  className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/60 p-5 transition hover:border-slate-700"
                >
                  <div className="space-y-1">
                    <h3 className="font-semibold text-white">
                      {scanner === "OSV" ? "OSV Scanner" : "Semgrep SAST"}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {scanner === "OSV"
                        ? "Open Source Vulnerabilities (Dependencies)"
                        : "Semantic static code vulnerability analysis"}
                    </p>
                  </div>

                  <span
                    className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-xs font-semibold ${getStatusBadgeClass()}`}
                  >
                    {scannerStatus}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Findings section */}
        <FindingsSection status={status} findings={findings} />
      </div>
    </div>
  );
}
