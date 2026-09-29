import { spawn } from "node:child_process";
import { join } from "node:path";

export function runSemgrep(workspace: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const rulesPath = join(process.cwd(), "scanner", "semgrep", "rules.yml");
    
    const semgrep = spawn("semgrep", [
      "scan",
      "--config",
      rulesPath,
      "--json",
      workspace,
    ]);

    let stdout = "";
    let stderr = "";

    semgrep.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    semgrep.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    semgrep.on("error", (error) => {
      reject(error);
    });

    semgrep.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Semgrep failed with exit code ${code}: ${stderr}`));
        return;
      }

      try {
        const result = JSON.parse(stdout);
        resolve(result);
      } catch {
        reject(new Error("Semgrep returned invalid JSON."));
      }
    });
  });
}
