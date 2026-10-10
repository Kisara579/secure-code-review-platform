import type { NormalizedFinding } from "./finding";

export interface OsvPackage {
  name: string;
  version: string;
}

interface OsvPackageQuery extends OsvPackage {
  pageToken?: string;
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
  next_page_token?: string;
}

interface OsvBatchResponse {
  results: OsvResponse[];
}

interface OsvVulnerabilityResponse {
  id: string;
  summary?: string;
  details?: string;
  aliases?: string[];
  database_specific?: {
    severity?: string;
    cwe_ids?: string[];
  };
}

interface OsvVulnerabilityMatch {
  vulnerabilityId: string;
  package: OsvPackage;
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

export async function queryOsvBatch(
  packages: OsvPackageQuery[],
): Promise<OsvBatchResponse> {
  const response = await fetch("https://api.osv.dev/v1/querybatch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      queries: packages.map((packageInfo) => ({
        package: {
          name: packageInfo.name,
          ecosystem: "npm",
        },
        version: packageInfo.version,
        ...(packageInfo.pageToken ? { page_token: packageInfo.pageToken } : {}),
      })),
    }),
  });

  if (!response.ok) {
    throw new Error(`OSV batch request failed with status ${response.status}`);
  }

  return (await response.json()) as OsvBatchResponse;
}

export function extractOsvVulnerabilityMatches(
  packages: OsvPackage[],
  batchResponse: OsvBatchResponse,
): OsvVulnerabilityMatch[] {
  const matches: OsvVulnerabilityMatch[] = [];

  for (let index = 0; index < packages.length; index++) {
    const packageInfo = packages[index];
    const result = batchResponse.results[index];

    if (!packageInfo || !result?.vulns) {
      continue;
    }

    for (const vulnerability of result.vulns) {
      matches.push({
        vulnerabilityId: vulnerability.id,
        package: packageInfo,
      });
    }
  }

  return matches;
}

export function deduplicateOsvVulnerabilityMatches(
  matches: OsvVulnerabilityMatch[],
): OsvVulnerabilityMatch[] {
  const unique = new Map<string, OsvVulnerabilityMatch>();

  for (const match of matches) {
    const key = [
      match.vulnerabilityId,
      match.package.name,
      match.package.version,
    ].join("|");

    unique.set(key, match);
  }

  return Array.from(unique.values());
}

export async function getOsvVulnerability(
  vulnerabilityId: string,
): Promise<OsvVulnerabilityResponse> {
  const response = await fetch(
    `https://api.osv.dev/v1/vulns/${encodeURIComponent(vulnerabilityId)}`,
  );

  if (!response.ok) {
    throw new Error(
      `OSV vulnerability request failed with status ${response.status}`,
    );
  }

  return (await response.json()) as OsvVulnerabilityResponse;
}

export async function scanOsvPackages(
  packages: OsvPackage[],
): Promise<NormalizedFinding[]> {
  if (packages.length === 0) {
    return [];
  }

  const batchResponse = await queryOsvBatch(packages);

  const matches = extractOsvVulnerabilityMatches(packages, batchResponse);

  const uniqueMatches = deduplicateOsvVulnerabilityMatches(matches);

  const findings: NormalizedFinding[] = [];

  for (const match of uniqueMatches) {
    const vulnerability = await getOsvVulnerability(match.vulnerabilityId);

    const finding = normalizeOsvVulnerability(vulnerability, match.package);

    findings.push(finding);
  }

  return findings;
}
