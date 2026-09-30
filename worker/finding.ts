export type FindingSource = "SEMGREP" | "OSV" | "NVD";

export type FindingSeverity =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

export interface NormalizedFinding {
  source: FindingSource;
  ruleId?: string;
  severity: FindingSeverity;
  message: string;
  filePath?: string;
  startLine?: number;
  endLine?: number;
  details?: Record<string, unknown>;
}