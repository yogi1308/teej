-- Rename the Merch table to match the new Clothing model name
ALTER TABLE "Merch" RENAME TO "Clothing";

-- Backfill existing rows to the clothing type
UPDATE "Clothing" SET "type" = 'clothing' WHERE "type" = 'merch';

-- Align the column default with the schema (@default("clothing"))
ALTER TABLE "Clothing" ALTER COLUMN "type" SET DEFAULT 'clothing';