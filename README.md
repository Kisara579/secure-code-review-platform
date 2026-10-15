# SecureReview AI

AI-powered automated secure code review and technical debt management platform for DevSecOps teams.

## Prerequisites

- Git
- Docker Engine
- Docker Compose

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/Kisara579/secure-code-review-platform.git
cd secure-code-review-platform
```

### 2. Configure environment variables

Create a `.env.docker` file in the project root.

Add the following configuration:

```env
POSTGRES_PASSWORD=your_secure_password
IMAGE_TAG=main
```

Replace `your_secure_password` with a strong database password.

### 3. Start the application

```bash
docker compose --env-file .env.docker up -d
```

This starts the application services, including PostgreSQL, Redis, database migrations, the web application, and the background worker.

### 4. Access the application

Open your browser and visit:

```text
http://localhost:3000
```

### 5. Stop the application

```bash
docker compose down
```

To remove the containers and their associated database and Redis data volumes:

```bash
docker compose down -v
```

**Warning:** The `-v` option permanently deletes the data stored in those Compose-managed volumes.