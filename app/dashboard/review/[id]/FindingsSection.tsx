"use client";

import { useState } from "react";
import { ShieldAlert, Info, Filter, FileCode, X, Search } from "lucide-react";

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

type FindingsSectionProps = {
  status: "QUEUED" | "RUNNING" | "COMPLETED" | "FAILED";
  findings: Finding[];
};

export default function FindingsSection({
  status,
  findings,
}: FindingsSectionProps) {
  const [selectedSeverity, setSelectedSeverity] = useState("ALL");
  const [selectedScanner, setSelectedScanner] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const severityCounts = {
    CRITICAL: findings.filter(
      (finding) => finding.severity.toUpperCase() === "CRITICAL",
    ).length,
    HIGH: findings.filter(
      (finding) => finding.severity.toUpperCase() === "HIGH",
    ).length,
    MEDIUM: findings.filter(
      (finding) => finding.severity.toUpperCase() === "MEDIUM",
    ).length,
    LOW: findings.filter((finding) => finding.severity.toUpperCase() === "LOW")
      .length,
  };

  const totalFindings = findings.length;

  const filteredFindings = findings.filter((finding) => {
    const matchesSeverity =
      selectedSeverity === "ALL" ||
      finding.severity.toUpperCase() === selectedSeverity;

    const matchesScanner =
      selectedScanner === "ALL" ||
      finding.source.toUpperCase() === selectedScanner;

    const matchesSearch =
      searchQuery.trim() === "" ||
      finding.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (finding.filePath &&
        finding.filePath.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (finding.ruleId &&
        finding.ruleId.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSeverity && matchesScanner && matchesSearch;
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity.toUpperCase()) {
      case "CRITICAL":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-0.5 text-xs font-semibold text-red-400">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
            CRITICAL
          </span>
        );
      case "HIGH":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-0.5 text-xs font-semibold text-orange-400">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            HIGH
          </span>
        );
      case "MEDIUM":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-400">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            MEDIUM
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            LOW
          </span>
        );
    }
  };

  return (
    <section className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Security Findings</h2>
          <p className="mt-1 text-sm text-slate-400">
            Detailed vulnerability breakdown reported across scanners
          </p>
        </div>

        <span className="inline-flex w-fit items-center rounded-full border border-slate-700/80 bg-slate-950/80 px-3.5 py-1 text-xs font-medium text-slate-300">
          {filteredFindings.length === totalFindings
            ? `${totalFindings} total findings`
            : `${filteredFindings.length} of ${totalFindings} findings matching`}
        </span>
      </div>

      {status === "QUEUED" || status === "RUNNING" ? (
        <div className="mt-8 rounded-xl border border-dashed border-slate-800 bg-slate-950/40 p-10 text-center">
          <Info className="mx-auto h-8 w-8 text-cyan-400 animate-pulse" />
          <p className="mt-3 font-medium text-white">Analysis in Progress</p>
          <p className="mt-1 text-sm text-slate-400">
            Findings will populate here automatically as security scanners
            complete their execution.
          </p>
        </div>
      ) : (
        <>
          {status === "FAILED" && (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
              <ShieldAlert className="h-5 w-5 shrink-0 text-red-400" />
              <div>
                <p className="font-semibold text-red-200">
                  Partial Results Warning
                </p>
                <p className="mt-0.5 text-red-300/80">
                  One or more scanners encountered an error during analysis. The
                  findings list below may be incomplete.
                </p>
              </div>
            </div>
          )}

          {/* Severity Counters Grid */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              {
                label: "CRITICAL",
                count: severityCounts.CRITICAL,
                color: "text-red-400",
                bg: "hover:border-red-500/40 border-red-500/20 bg-red-500/5",
              },
              {
                label: "HIGH",
                count: severityCounts.HIGH,
                color: "text-orange-400",
                bg: "hover:border-orange-500/40 border-orange-500/20 bg-orange-500/5",
              },
              {
                label: "MEDIUM",
                count: severityCounts.MEDIUM,
                color: "text-amber-400",
                bg: "hover:border-amber-500/40 border-amber-500/20 bg-amber-500/5",
              },
              {
                label: "LOW",
                count: severityCounts.LOW,
                color: "text-blue-400",
                bg: "hover:border-blue-500/40 border-blue-500/20 bg-blue-500/5",
              },
            ].map(({ label, count, color, bg }) => (
              <button
                key={label}
                type="button"
                onClick={() =>
                  setSelectedSeverity(
                    selectedSeverity === label ? "ALL" : label,
                  )
                }
                className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all ${bg} ${
                  selectedSeverity === label
                    ? "ring-2 ring-cyan-500/40 brightness-110"
                    : ""
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {label}
                </span>
                <span className={`mt-2 text-2xl font-bold ${color}`}>
                  {count}
                </span>
              </button>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="mt-6 flex flex-col gap-3 rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search messages, rules, or file paths…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-700/60 bg-slate-900/80 py-2 pl-9 pr-3 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500/60"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-500" />
                <select
                  aria-label="Filter by severity"
                  value={selectedSeverity}
                  onChange={(event) => setSelectedSeverity(event.target.value)}
                  className="rounded-lg border border-slate-700/60 bg-slate-900/80 px-3 py-2 text-sm text-slate-200 outline-none focus:border-cyan-500/60"
                >
                  <option value="ALL">All Severities</option>
                  <option value="CRITICAL">Critical</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
              </div>

              <select
                aria-label="Filter by scanner engine"
                value={selectedScanner}
                onChange={(event) => setSelectedScanner(event.target.value)}
                className="rounded-lg border border-slate-700/60 bg-slate-900/80 px-3 py-2 text-sm text-slate-200 outline-none focus:border-cyan-500/60"
              >
                <option value="ALL">All Scanners</option>
                <option value="OSV">OSV</option>
                <option value="SEMGREP">Semgrep</option>
              </select>

              {(selectedSeverity !== "ALL" ||
                selectedScanner !== "ALL" ||
                searchQuery.trim() !== "") && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSeverity("ALL");
                    setSelectedScanner("ALL");
                    setSearchQuery("");
                  }}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Finding Cards */}
          {filteredFindings.length === 0 ? (
            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/40 p-8 text-center text-slate-400">
              <p className="text-sm">
                {findings.length === 0
                  ? "No findings were reported by the completed scans"
                  : "No findings match the active search or filters."}
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {filteredFindings.map((finding) => (
                <article
                  key={finding.id}
                  className="group rounded-xl border border-slate-800/80 bg-slate-950/70 p-5 transition hover:border-slate-700 hover:bg-slate-900/50"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {getSeverityBadge(finding.severity)}
                        <span className="rounded-md border border-slate-800 bg-slate-900 px-2 py-0.5 text-[11px] font-mono text-cyan-400">
                          {finding.source}
                        </span>
                        {finding.ruleId && (
                          <span className="text-xs font-mono text-slate-500">
                            {finding.ruleId}
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-semibold leading-relaxed text-slate-100 sm:text-base">
                        {finding.message}
                      </h3>

                      {finding.filePath && (
                        <div className="inline-flex flex-wrap items-center gap-1.5 rounded-lg border border-slate-800/90 bg-slate-900/60 px-2.5 py-1 text-xs font-mono text-slate-300">
                          <FileCode className="h-3.5 w-3.5 text-cyan-400" />
                          <span className="break-all">{finding.filePath}</span>
                          {finding.startLine != null && (
                            <span className="text-cyan-400">
                              :L{finding.startLine}
                              {finding.endLine != null &&
                              finding.endLine !== finding.startLine
                                ? `-L${finding.endLine}`
                                : ""}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
