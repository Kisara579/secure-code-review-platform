import { readFile } from "node:fs/promises";

interface LockfilePackage {
  version?: string;
}

interface PackageLock {
  lockfileVersion: number;
  packages?: Record<string, LockfilePackage>;
}

export interface NpmDependency {
  name: string;
  version: string;
}

export async function parsePackageLock(
  lockfilePath: string,
): Promise<NpmDependency[]> {
  const content = await readFile(lockfilePath, "utf-8");

  const lockfile = JSON.parse(content) as PackageLock;

  if (lockfile.lockfileVersion !== 3) {
    throw new Error(
      `Unsupported package-lock.json version: ${lockfile.lockfileVersion}`,
    );
  }

  if (!lockfile.packages) {
    return [];
  }

  const dependencies: NpmDependency[] = [];

  for (const [path, packageInfo] of Object.entries(lockfile.packages)) {
    if (!path.startsWith("node_modules/")) {
      continue;
    }

    if (!packageInfo.version) {
      continue;
    }

    const marker = "node_modules/";
    const lastIndex = path.lastIndexOf(marker);
    const name = path.slice(lastIndex + marker.length);
    
    dependencies.push({
      name,
      version: packageInfo.version,
    });
  }

  return dependencies;
}
