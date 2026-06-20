/*
  Warnings:

  - You are about to drop the column `coverAssetid` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Album` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Album" DROP COLUMN "coverAssetid",
DROP COLUMN "createdAt",
ADD COLUMN     "coverAssetId" TEXT;
