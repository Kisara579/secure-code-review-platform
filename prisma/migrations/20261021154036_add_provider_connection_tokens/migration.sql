-- AlterTable
ALTER TABLE "ProviderConnection" ADD COLUMN     "accessTokenEncrypted" TEXT,
ADD COLUMN     "refreshTokenEncrypted" TEXT;
