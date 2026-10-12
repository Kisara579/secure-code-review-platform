import { useState } from "react";

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

    return matchesSeverity && matchesScanner;
  });

  return (
    <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-white">Security Findings</h2>

        <span className="w-fit rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-sm text-slate-300">
          {filteredFindings.length === totalFindings
            ? `${totalFindings} findings`
            : `${filteredFindings.length} of ${totalFindings} findings`}
        </span>
      </div>

      {status === "QUEUED" || status === "RUNNING" ? (
        <p className="mt-4 text-slate-400">
          Findings will appear here when the security review finishes.
        </p>
      ) : (
        <>
          {status === "FAILED" && (
            <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
              One or more scanners failed. The findings below may be incomplete.
              Review the scanner statuses before interpreting the results.
            </p>
          )}
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {(
              [
                ["CRITICAL", severityCounts.CRITICAL, "text-red-400"],
                ["HIGH", severityCounts.HIGH, "text-orange-400"],
                ["MEDIUM", severityCounts.MEDIUM, "text-yellow-400"],
                ["LOW", severityCounts.LOW, "text-slate-500"],
              ] as const
            ).map(([severity, count, color]) => (
              <div
                key={severity}
                className="rounded-xl border border-slate-800 bg-slate-900 p-4"
              >
                <p className="text-sm text-slate-400">{severity}</p>
                <p className={`mt-2 text-2xl font-bold ${color}`}>{count}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-end gap-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <label
                htmlFor="severity-filter"
                className="text-sm font-medium text-slate-300"
              >
                Severity
              </label>

              <select
                id="severity-filter"
                value={selectedSeverity}
                onChange={(event) => setSelectedSeverity(event.target.value)}
                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
              >
                <option value="ALL">All severities</option>
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <label
                htmlFor="scanner-filter"
                className="text-sm font-medium text-slate-300"
              >
                Scanner
              </label>

              <select
                id="scanner-filter"
                value={selectedScanner}
                onChange={(event) => setSelectedScanner(event.target.value)}
                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
              >
                <option value="ALL">All scanners</option>
                <option value="OSV">OSV</option>
                <option value="SEMGREP">Semgrep</option>
              </select>
            </div>
            {(selectedSeverity !== "ALL" || selectedScanner !== "ALL") && (
              <button
                type="button"
                onClick={() => {
                  setSelectedSeverity("ALL");
                  setSelectedScanner("ALL");
                }}
                className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                Clear filters
              </button>
            )}
          </div>

          {filteredFindings.length === 0 ? (
            <p className="mt-4 text-slate-400">
              {findings.length === 0
                ? "No findings were reported by the scanners."
                : "No findings match the selected filters."}
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {filteredFindings.map((finding) => (
                <article
                  key={finding.id}
                  className="rounded-xl border border-slate-800 bg-slate-900 p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-semibold text-white">
                        {finding.message}
                      </h3>

                      <p className="mt-2 text-sm text-slate-400">
                        Source: {finding.source}
                        {finding.ruleId ? ` · Rule: ${finding.ruleId}` : ""}
                      </p>

                      {finding.filePath && (
                        <p className="mt-1 break-all text-sm text-slate-400">
                          File: {finding.filePath}
                          {finding.startLine != null
                            ? ` · Line ${finding.startLine}`
                            : ""}
                          {finding.endLine != null &&
                          finding.endLine !== finding.startLine
                            ? `–${finding.endLine}`
                            : ""}
                        </p>
                      )}
                    </div>

                    <span
                      className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${
                        finding.severity.toUpperCase() === "CRITICAL"
                          ? "border-red-400 bg-red-500/10 text-red-300"
                          : finding.severity.toUpperCase() === "HIGH"
                            ? "border-orange-400 bg-orange-500/10 text-orange-300"
                            : finding.severity.toUpperCase() === "MEDIUM"
                              ? "border-yellow-400 bg-yellow-500/10 text-yellow-300"
                              : "border-slate-600 bg-slate-800 text-slate-300"
                      }`}
                    >
                      {finding.severity.toUpperCase()}
                    </span>
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
