/*
  Warnings:

  - You are about to drop the column `imageAssetid` on the `Track` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Track" DROP COLUMN "imageAssetid",
ADD COLUMN     "imageAssetId" TEXT;
