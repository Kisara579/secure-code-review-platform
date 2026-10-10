import { mkdtemp,rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

export async function createWorkspace(): Promise<string> {
  const prefix = join(tmpdir(), "secure-review-");

  return mkdtemp(prefix);
}

export async function removeWorkspace(workspace: string): Promise<void> {
  await rm(workspace, {
    recursive: true,
    force: true,
  });
}
