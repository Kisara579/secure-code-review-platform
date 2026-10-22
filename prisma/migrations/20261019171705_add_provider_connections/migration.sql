-- CreateTable
CREATE TABLE "ProviderConnection" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProviderConnection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProviderConnection_userId_idx" ON "ProviderConnection"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProviderConnection_userId_provider_key" ON "ProviderConnection"("userId", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "ProviderConnection_provider_externalId_key" ON "ProviderConnection"("provider", "externalId");

-- AddForeignKey
ALTER TABLE "ProviderConnection" ADD CONSTRAINT "ProviderConnection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
