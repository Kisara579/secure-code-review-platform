import { spawn } from "node:child_process";
import { chmod, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

export async function cloneRepository(
  repositoryUrl: string,
  branch: string,
  destination: string,
  accessToken?: string,
): Promise<void> {
  let helperDirectory: string | undefined;

  try {
    const env = { ...process.env };

    if (accessToken) {
      const isGitLabUrl = /^https:\/\/gitlab\.com\//i.test(repositoryUrl);

      if (!isGitLabUrl) {
        throw new Error(
          "GitLab authentication is only supported for gitlab.com HTTPS repositories.",
        );
      }

      helperDirectory = await mkdtemp(join(tmpdir(), "secure-review-askpass-"));

      const isWindows = process.platform === "win32";
      const helperPath = join(
        helperDirectory,
        isWindows ? "askpass.cmd" : "askpass.sh",
      );

      const helperScript = isWindows
        ? [
            "@echo off",
            'echo %~1 | findstr /I "Username" >nul',
            "if not errorlevel 1 (",
            "  echo oauth2",
            ") else (",
            "  echo %GITLAB_ACCESS_TOKEN%",
            ")",
            "",
          ].join("\r\n")
        : [
            "#!/bin/sh",
            'case "$1" in',
            '  *Username*) printf "%s\\n" "oauth2" ;;',
            '  *) printf "%s\\n" "$GITLAB_ACCESS_TOKEN" ;;',
            "esac",
            "",
          ].join("\n");

      await writeFile(helperPath, helperScript, {
        encoding: "utf8",
        mode: 0o700,
        flag: "wx",
      });

      if (!isWindows) {
        await chmod(helperPath, 0o700);
      }

      env.GIT_ASKPASS = helperPath;
      env.GITLAB_ACCESS_TOKEN = accessToken;
      env.GIT_TERMINAL_PROMPT = "0";
    }

    await new Promise<void>((resolve, reject) => {
      const git = spawn(
        "git",
        ["clone", "--branch", branch, repositoryUrl, destination],
        {
          env,
          windowsHide: true,
          stdio: ["ignore", "pipe", "pipe"],
        },
      );

      git.stdout.on("data", (data: Buffer) => {
        process.stdout.write(data);
      });

      git.stderr.on("data", (data: Buffer) => {
        process.stderr.write(data);
      });

      git.on("error", reject);

      git.on("close", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`git clone failed with exit code ${code}`));
        }
      });
    });
  } finally {
    if (helperDirectory) {
      await rm(helperDirectory, { recursive: true, force: true });
    }
  }
}
