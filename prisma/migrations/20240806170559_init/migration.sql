/*
  Warnings:

  - You are about to drop the column `techType` on the `Database` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Database" DROP COLUMN "techType",
ADD COLUMN     "databaseType" "DatabaseType" NOT NULL DEFAULT 'SQL';

-- AlterTable
ALTER TABLE "FrameworkLibrary" ALTER COLUMN "techCategory" SET DEFAULT 'FRONTEND',
ALTER COLUMN "techType" SET DEFAULT 'LIBRARY';

-- AlterTable
ALTER TABLE "Language" ALTER COLUMN "languageType" SET DEFAULT 'PROGRAMMING';
