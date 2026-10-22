import { spawn } from "node:child_process";

export type VerificationResult = {
  valid: boolean;
  error?: string;
  reason?: "REPO_NOT_FOUND" | "BRANCH_NOT_FOUND" | "TIMEOUT" | "INVALID_URL";
};

export function verifyGitRepositoryAndBranch(
  repositoryUrl: string,
  branch: string,
  timeoutMs = 15000,
): Promise<VerificationResult> {
  return new Promise((resolve) => {
    const cleanUrl = repositoryUrl.trim().replace(/\/+$/, "");
    const cleanBranch = branch.trim().replace(/^refs\/heads\//, "");

    if (!cleanUrl || !cleanBranch) {
      return resolve({
        valid: false,
        error: "Repository URL and branch are required.",
        reason: "INVALID_URL",
      });
    }

    try {
      const parsed = new URL(cleanUrl);
      if (
        parsed.hostname !== "github.com" &&
        parsed.hostname !== "gitlab.com"
      ) {
        return resolve({
          valid: false,
          error: "Only GitHub and GitLab repositories are supported.",
          reason: "INVALID_URL",
        });
      }
      const parts = parsed.pathname.split("/").filter(Boolean);
      if (parts.length !== 2) {
        return resolve({
          valid: false,
          error:
            "Please enter a valid repository URL (e.g. https://github.com/owner/repo).",
          reason: "INVALID_URL",
        });
      }
    } catch {
      return resolve({
        valid: false,
        error: "Please enter a valid repository URL.",
        reason: "INVALID_URL",
      });
    }
    const env: NodeJS.ProcessEnv = {
      ...process.env,
      GIT_TERMINAL_PROMPT: "0",
      GCM_INTERACTIVE: "never",
    };

    delete env.GIT_ASKPASS;

    const args = [
      "-c",
      "credential.helper=",
      "ls-remote",
      "--heads",
      cleanUrl,
      `refs/heads/${cleanBranch}`,
    ];

    let finished = false;
    let stdout = "";

    const proc = spawn("git", args, { env });

    const timer = setTimeout(() => {
      if (!finished) {
        finished = true;
        try {
          proc.kill("SIGKILL");
        } catch {
          // Process already ended
        }
        resolve({
          valid: false,
          error:
            "Connection timed out while verifying repository. Please try again.",
          reason: "TIMEOUT",
        });
      }
    }, timeoutMs);

    proc.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    proc.on("error", (error) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      resolve({
        valid: false,
        error: `Failed to execute git verification: ${error.message}`,
        reason: "REPO_NOT_FOUND",
      });
    });

    proc.on("close", (code) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);

      if (code !== 0) {
        return resolve({
          valid: false,
          error:
            "Repository does not exist, is private, or cannot be accessed. Please verify the URL.",
          reason: "REPO_NOT_FOUND",
        });
      }

      // Check if the specific branch ref was returned
      const lines = stdout
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      const branchFound = lines.some((line) => {
        const parts = line.split(/\s+/);
        return parts.length >= 2 && parts[1] === `refs/heads/${cleanBranch}`;
      });

      if (!branchFound) {
        return resolve({
          valid: false,
          error: `Branch "${cleanBranch}" does not exist in this repository. Please check the branch name.`,
          reason: "BRANCH_NOT_FOUND",
        });
      }

      return resolve({
        valid: true,
      });
    });
  });
}
