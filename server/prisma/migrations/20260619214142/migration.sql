/*
  Warnings:

  - Added the required column `songAssetId` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "coverAssetid" TEXT;

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "imageAssetid" TEXT,
ADD COLUMN     "songAssetId" TEXT NOT NULL;
