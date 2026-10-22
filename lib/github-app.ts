import "server-only";

import { createAppAuth } from "@octokit/auth-app";
import { Octokit } from "@octokit/rest";
import { readFile } from "node:fs/promises";

export async function getGitHubInstallationOctokit(
  installationId: number,
): Promise<Octokit> {
  if (!Number.isSafeInteger(installationId) || installationId <= 0) {
    throw new Error("Invalid GitHub installation ID.");
  }

  const appId = process.env.GITHUB_APP_ID;
  const clientId = process.env.GITHUB_APP_CLIENT_ID;
  const clientSecret = process.env.GITHUB_APP_CLIENT_SECRET;
  const privateKeyPath = process.env.GITHUB_APP_PRIVATE_KEY_PATH;

  if (!appId || !clientId || !clientSecret || !privateKeyPath) {
    throw new Error("GitHub App configuration is incomplete.");
  }

  const privateKey = await readFile(privateKeyPath, "utf8");

  const appAuth = createAppAuth({
    appId,
    privateKey,
    clientId,
    clientSecret,
  });

  const installationAuthentication = await appAuth({
    type: "installation",
    installationId,
  });

  return new Octokit({
    auth: installationAuthentication.token,
  });
}
