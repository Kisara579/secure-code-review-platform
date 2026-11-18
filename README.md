# SecureReview AI

SecureReview AI scans GitHub and GitLab branches on demand and shows security and dependency findings in a web dashboard.

## Current features

- Submit a public repository URL and branch, or browse repositories from a connected GitHub App installation. GitHub scans currently require a public repository.
- Run background scans with BullMQ and Redis. Semgrep checks a small set of JavaScript security rules, and OSV checks npm dependencies from `package-lock.json`.
- View scan progress, scanner status, filtered findings, and review history. PostgreSQL stores reviews and findings through Prisma.
- Sign in with email and password or a configured social provider. Resend delivers verification and password reset emails.

The next milestone is automatic pull request scanning with signed webhooks, PR comments, and pass/fail checks. Technical-debt scoring, Gemini remediation, and CyberMind SOC tools are planned.

## Run with Docker

You need Git, Docker, and Docker Compose. Clone the repository and check out the branch you want to run.

```bash
git clone https://github.com/Kisara579/secure-code-review-platform.git
cd secure-code-review-platform
```

Create `.env.docker` at the repository root and fill in these settings.

```dotenv
IMAGE_TAG=local
POSTGRES_PASSWORD=replace_with_a_long_random_alphanumeric_password
BETTER_AUTH_SECRET=replace_with_a_generated_random_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
RESEND_API_KEY=replace_with_your_resend_api_key
RESEND_FROM_EMAIL="SecureReview AI <reviews@your-domain.example>"
GITHUB_APP_PRIVATE_KEY_HOST_PATH=/absolute/path/to/github-app-key.pem
```

Use a sender authorized in Resend for verification and password recovery. The install route points to `securereview-ai-app`. To enable GitHub repository browsing, set that App's `GITHUB_APP_ID`, `GITHUB_APP_CLIENT_ID`, and `GITHUB_APP_CLIENT_SECRET`, and point the host path at its PEM file. For manual scans, Compose still requires a file to mount. You can use an empty local `.pem` file and leave the GitHub App settings unset. Keep credentials and the private key out of Git.

Build both images from your checkout and start the services.

```bash
docker build --build-arg NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000 -t ghcr.io/kisara579/secure-code-review-platform-web:local .
docker build -f worker.Dockerfile -t ghcr.io/kisara579/secure-code-review-platform-worker:local .
docker compose --env-file .env.docker up -d
```

Compose starts PostgreSQL and Redis, applies migrations, then starts the web app and worker. If you change the public URL, use the same URL in the Docker build argument and the auth settings.

Open [localhost:3000](http://localhost:3000), sign in, and choose **New Review → Manual URL**. Enter a public GitHub or GitLab repository URL and an existing branch, then choose **Start Review**. The review page shows progress and findings as the worker finishes.

Use `docker compose --env-file .env.docker ps` to check the services and `docker compose --env-file .env.docker logs -f web worker` to follow the web and worker logs.

Stop the stack when you're done.

```bash
docker compose --env-file .env.docker down
```

Adding `-v` also deletes the PostgreSQL and Redis volumes.

## Local development

Use Node.js 22, npm, Git, and Semgrep on your PATH. Create a private `.env` from [`.env.example`](.env.example), set the PostgreSQL, Redis, Better Auth, and Resend values, and configure any providers you plan to use.

```bash
npm ci
npx prisma generate
npx prisma migrate deploy
npm run dev
```

Start the worker from the repository root in a second terminal.

```bash
npm run worker
```

Use `npm run lint` for lint checks and `npm run build` for a production build.

