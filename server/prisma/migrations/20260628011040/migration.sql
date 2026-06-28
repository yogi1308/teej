/*
  Warnings:

  - Added the required column `inStock` to the `Merch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Merch" ADD COLUMN     "inStock" INTEGER NOT NULL;
