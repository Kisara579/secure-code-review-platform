# SecureReview AI

SecureReview AI scans GitHub and GitLab branches on demand and shows security and dependency findings in a web dashboard.

- Run background scans with BullMQ and Redis. Semgrep checks JavaScript security rules, and OSV checks npm dependencies from `package-lock.json`.
- View scan progress, scanner status, filtered findings, and review history.
- Sign in with email and password or a configured social provider.

## Run with Docker

You need Git, Docker Engine or Docker Desktop, and Docker Compose v2.

### 1. Clone the repository

```bash
git clone https://github.com/Kisara579/secure-code-review-platform.git
cd secure-code-review-platform
```

Check out the branch you want to run before building.

### 2. Configure `.env`

Create `.env` from [`.env.example`](.env.example). On PowerShell, run `Copy-Item .env.example .env` if `.env` does not exist. If you already have an `.env`, edit it in place. Fill in these values for the email sign-in setup.

```dotenv
POSTGRES_PASSWORD=replace_with_a_long_random_alphanumeric_password
BETTER_AUTH_SECRET=replace_with_a_generated_random_secret
RESEND_API_KEY=replace_with_your_resend_api_key
RESEND_FROM_EMAIL="SecureReview AI <reviews@your-domain.example>"
```

Generate a random Better Auth secret, for example with `openssl rand -base64 32`. Use a sender authorized in Resend. The containers can start with the Resend settings empty, and email/password registration requires email verification before sign-in. If you use social sign-in instead, configure that provider’s client ID, secret, and callback URL.

Compose provides its own PostgreSQL and Redis connection strings. The default application URL is `http://localhost:3000`. For another origin, set `BETTER_AUTH_URL` in `.env` before building. GitHub App and GitLab repository credentials are only needed when you enable those integrations. Keep `.env`, `.env.docker`, and private keys out of version control.

### 3. Build and start the application

```bash
docker compose config --quiet
docker compose build web worker
docker compose up -d
```

Compose starts PostgreSQL and Redis, applies the Prisma migrations, and starts the web app and worker. Run `docker compose ps -a` to see the service states and `docker compose logs migrate web worker` to troubleshoot startup.

### 4. Run a review

Open [localhost:3000](http://localhost:3000) and sign in. Select **New Review → Manual URL**, enter a public GitHub or GitLab repository URL and an existing branch, then select **Start Review**. Follow progress and findings on the review page. **Review History** lists previous scans.

### 5. Stop the application

```bash
docker compose down
```

`docker compose down -v` permanently deletes the PostgreSQL and Redis data volumes.

## Optional configuration

### Keep an existing `.env.docker`

The minimal Docker override file can still contain just these two settings.

```dotenv
POSTGRES_PASSWORD=replace_with_a_long_random_alphanumeric_password
IMAGE_TAG=local
```

Keep app credentials in `.env`. When using both files, pass the same options to each Compose command. Values in `.env.docker` take precedence over matching values in `.env`.

```bash
docker compose --env-file .env --env-file .env.docker build web worker
docker compose --env-file .env --env-file .env.docker up -d
```

The `main` tag is used by the GHCR publishing workflow. For published images built for your application URL, set `IMAGE_TAG=main`, run `docker compose pull web worker migrate`, then run `docker compose up -d --no-build`. Include your environment file options if you use the split setup.

### Enable the GitHub App repository picker

The install route uses the `securereview-ai-app` GitHub App. Set its `GITHUB_APP_ID`, `GITHUB_APP_CLIENT_ID`, and `GITHUB_APP_CLIENT_SECRET` in `.env`. Store its private key outside the checkout and set `GITHUB_APP_PRIVATE_KEY_HOST_PATH` to the absolute path of the PEM file.

```bash
docker compose -f compose.yaml -f compose.github-app.yaml build web worker
docker compose -f compose.yaml -f compose.github-app.yaml up -d
```

Use the same Compose files for later commands. The override mounts the key read-only. GitHub App browsing is available with the configured installation. The review worker currently scans public GitHub repositories.

## Local development without Docker

Use Node.js 22, npm, Git, and Semgrep on your PATH. Start or provision PostgreSQL and Redis, then set `DATABASE_URL` and `REDIS_URL` in `.env`. Set `DIRECT_URL` when migrations need a separate PostgreSQL connection. Use the same Better Auth and email or OAuth settings as above.

```bash
npm ci
npx prisma generate
npx prisma migrate deploy
npm run dev
```

Run `npm run worker` from the repository root in a second terminal. Use `npm run lint` for lint checks and `npm run build` for a production web build.
