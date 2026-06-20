/*
  Warnings:

  - You are about to drop the column `album` on the `Music` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Music` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Music` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Music` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Music` table. All the data in the column will be lost.
  - You are about to drop the column `releaseDate` on the `Music` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Music" DROP COLUMN "album",
DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "imageUrl",
DROP COLUMN "order",
DROP COLUMN "releaseDate",
ADD COLUMN     "albumPosition" INTEGER,
ADD COLUMN     "displayPostion" INTEGER,
ADD COLUMN     "plays" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "coverUrl" TEXT,
    "description" TEXT,
    "releaseDate" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);
