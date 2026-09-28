import { spawn } from "node:child_process";

export function cloneRepository(
  repositoryUrl: string,
  branch: string,
  destination: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const git = spawn("git", [
      "clone",
      "--branch",
      branch,
      repositoryUrl,
      destination,
    ]);

    git.stdout.on("data", (data) => {
      process.stdout.write(data);
    });

    git.stderr.on("data", (data) => {
      process.stderr.write(data);
    });

    git.on("error", (error) => {
      reject(error);
    });

    git.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`git clone failed with exit code ${code}`));
      }
    });
  });
}
