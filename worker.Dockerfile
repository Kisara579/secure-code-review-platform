
FROM node:22-bookworm-slim

WORKDIR /app

# Install Git and Python for repository scanning
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       git \
       python3 \
       python3-pip \
       python3-venv \
    && rm -rf /var/lib/apt/lists/*


# Install Node.js dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Install Semgrep in an isolated Python environment
RUN python3 -m venv /opt/semgrep-venv \
    && /opt/semgrep-venv/bin/pip install --no-cache-dir semgrep==1.178.0

ENV PATH="/opt/semgrep-venv/bin:${PATH}"
ENV NODE_ENV=production

# Copy application and scanner files
COPY . .

# Generate Prisma Client
RUN DATABASE_URL="postgresql://build:build@localhost:5432/build" npx prisma generate
# Start the background review worker
CMD ["npm", "run", "worker"]
