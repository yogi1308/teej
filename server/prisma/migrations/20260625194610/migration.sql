/*
  Warnings:

  - The `imageUrl` column on the `Merch` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Album" ALTER COLUMN "env" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "env" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Home" ALTER COLUMN "env" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Merch" DROP COLUMN "imageUrl",
ADD COLUMN     "imageUrl" TEXT[],
ALTER COLUMN "env" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Track" ALTER COLUMN "env" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "env" DROP DEFAULT;
