-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'album';

-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'blog';

-- AlterTable
ALTER TABLE "Merch" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'merch';

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'track';
