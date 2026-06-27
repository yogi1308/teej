/*
  Warnings:

  - Added the required column `env` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `env` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `env` to the `Home` table without a default value. This is not possible if the table is not empty.
  - Added the required column `env` to the `Merch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `env` to the `Track` table without a default value. This is not possible if the table is not empty.
  - Added the required column `env` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "env" TEXT NOT NULL DEFAULT 'dev';

-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "env" TEXT NOT NULL DEFAULT 'dev';

-- AlterTable
ALTER TABLE "Home" ADD COLUMN     "env" TEXT NOT NULL DEFAULT 'dev';

-- AlterTable
ALTER TABLE "Merch" ADD COLUMN     "env" TEXT NOT NULL DEFAULT 'dev';

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "env" TEXT NOT NULL DEFAULT 'dev';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "env" TEXT NOT NULL DEFAULT 'dev';
