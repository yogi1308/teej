/*
  Warnings:

  - You are about to drop the column `pdfAssetId` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `pdfUrl` on the `Blog` table. All the data in the column will be lost.
  - The `meta` column on the `Blog` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "pdfAssetId",
DROP COLUMN "pdfUrl",
ADD COLUMN     "description" TEXT,
DROP COLUMN "meta",
ADD COLUMN     "meta" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" DROP NOT NULL;
