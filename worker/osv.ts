import type { NormalizedFinding } from "./finding";

export interface OsvPackage {
  name: string;
  version: string;
}

interface OsvVulnerability {
  id: string;
  summary?: string;
  details?: string;
  aliases?: string[];
  database_specific?: {
    severity?: string;
    cwe_ids?: string[];
  };
}

interface OsvResponse {
  vulns?: OsvVulnerability[];
}

function normalizeSeverity(severity?: string): NormalizedFinding["severity"] {
  switch (severity?.toUpperCase()) {
    case "CRITICAL":
      return "CRITICAL";

    case "HIGH":
      return "HIGH";

    case "MODERATE":
      return "MEDIUM";

    case "MEDIUM":
      return "MEDIUM";

    case "LOW":
      return "LOW";

    default:
      return "LOW";
  }
}

export function normalizeOsvVulnerability(
  vulnerability: OsvVulnerability,
  packageInfo: OsvPackage,
): NormalizedFinding {
  return {
    source: "OSV",
    ruleId: vulnerability.id,
    severity: normalizeSeverity(vulnerability.database_specific?.severity),
    message: vulnerability.summary ?? "Dependency vulnerability",
    details: {
      package: packageInfo.name,
      version: packageInfo.version,
      aliases: vulnerability.aliases ?? [],
      osvId: vulnerability.id,
      details: vulnerability.details,
      cweIds: vulnerability.database_specific?.cwe_ids ?? [],
    },
  };
}

export function normalizeOsvResponse(
  response: OsvResponse,
  packageInfo: OsvPackage,
): NormalizedFinding[] {
  if (!Array.isArray(response.vulns)) {
    return [];
  }

  return response.vulns.map((vulnerability) =>
    normalizeOsvVulnerability(vulnerability, packageInfo),
  );
}

export async function queryOsv(packageInfo: OsvPackage): Promise<OsvResponse> {
  const response = await fetch("https://api.osv.dev/v1/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      package: {
        name: packageInfo.name,
        ecosystem: "npm",
      },
      version: packageInfo.version,
    }),
  });

  if (!response.ok) {
    throw new Error(`OSV request failed with status ${response.status}`);
  }

  return (await response.json()) as OsvResponse;
}
