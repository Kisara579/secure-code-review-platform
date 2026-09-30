import type {
  FindingSeverity,
  NormalizedFinding,
} from "./finding";

interface SemgrepResult {
  check_id?: string;
  path?: string;
  start?: {
    line?: number;
  };
  end?: {
    line?: number;
  };
  extra?: {
    message?: string;
    severity?: string;
  };
}

interface SemgrepOutput {
  results?: SemgrepResult[];
}

function normalizeSeverity(severity?: string): FindingSeverity {
  switch (severity?.toUpperCase()) {
    case "ERROR":
      return "HIGH";

    case "WARNING":
      return "MEDIUM";

    case "INFO":
      return "LOW";

    default:
      return "LOW";
  }
}

export function parseSemgrepResults(
  output: unknown,
): NormalizedFinding[] {
  const semgrepOutput = output as SemgrepOutput;

  if (!Array.isArray(semgrepOutput.results)) {
    return [];
  }

  return semgrepOutput.results.map((result) => ({
    source: "SEMGREP",
    ruleId: result.check_id,
    severity: normalizeSeverity(result.extra?.severity),
    message: result.extra?.message ?? "Semgrep finding",
    filePath: result.path,
    startLine: result.start?.line,
    endLine: result.end?.line,
  }));
}