FROM node:22-bookworm-slim AS base

WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci


# Generate Prisma client and build Next.js
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time placeholders only; no real services or secrets
ENV DATABASE_URL="postgresql://build:build@localhost:5432/build"
ENV REDIS_URL="redis://localhost:6379"

RUN npx prisma generate
RUN npm run build


# Production web image
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]