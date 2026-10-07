-- CreateEnum
CREATE TYPE "ScannerStatus" AS ENUM ('RUNNING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "ScannerType" AS ENUM ('OSV', 'SEMGREP');

-- CreateTable
CREATE TABLE "ScannerRun" (
    "id" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "scanner" "ScannerType" NOT NULL,
    "status" "ScannerStatus" NOT NULL,

    CONSTRAINT "ScannerRun_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScannerRun" ADD CONSTRAINT "ScannerRun_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
