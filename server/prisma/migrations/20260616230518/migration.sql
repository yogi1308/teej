/*
  Warnings:

  - You are about to drop the column `link` on the `Music` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Music` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Music" DROP COLUMN "link",
DROP COLUMN "updatedAt",
ADD COLUMN     "releaseDate" TEXT,
ADD COLUMN     "songUrl" TEXT;
