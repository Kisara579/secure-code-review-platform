import { readdir } from "node:fs/promises";
import { join } from "node:path";

const IGNORED_DIRECTORIES = new Set([".git", "node_modules"]);

export async function findPackageLockFiles(
  workspace: string,
): Promise<string[]> {
  const lockfiles: string[] = [];

  async function walk(directory: string): Promise<void> {
    const entries = await readdir(directory, {
      withFileTypes: true,
    });

    for (const entry of entries) {
      const fullPath = join(directory, entry.name);

      if (entry.isDirectory()) {
        if (IGNORED_DIRECTORIES.has(entry.name)) {
          continue;
        }

        await walk(fullPath);
        continue;
      }

      if (entry.isFile() && entry.name === "package-lock.json") {
        lockfiles.push(fullPath);
      }
    }
  }

  await walk(workspace);

  return lockfiles;
}
