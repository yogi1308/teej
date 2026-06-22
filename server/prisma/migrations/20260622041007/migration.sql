/*
  Warnings:

  - You are about to drop the column `content` on the `Blog` table. All the data in the column will be lost.
  - Added the required column `contentAssetId` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentUrl` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageAssetId` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtitle` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "content",
ADD COLUMN     "contentAssetId" TEXT NOT NULL,
ADD COLUMN     "contentUrl" TEXT NOT NULL,
ADD COLUMN     "displayPosition" INTEGER,
ADD COLUMN     "imageAssetId" TEXT NOT NULL,
ADD COLUMN     "pdfAssetId" TEXT,
ADD COLUMN     "pdfUrl" TEXT,
ADD COLUMN     "subtitle" TEXT NOT NULL;
