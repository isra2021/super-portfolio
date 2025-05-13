/*
  Warnings:

  - You are about to drop the column `category` on the `Database` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Database` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `FrameworkLibrary` table. All the data in the column will be lost.
  - You are about to drop the column `styleId` on the `FrameworkLibrary` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `FrameworkLibrary` table. All the data in the column will be lost.
  - You are about to drop the column `programmingLanguageId` on the `Technologies` table. All the data in the column will be lost.
  - You are about to drop the column `styleId` on the `Technologies` table. All the data in the column will be lost.
  - You are about to drop the `ProgrammingLanguage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Style` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FrameworkLibraryToProgrammingLanguage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `techCategory` to the `FrameworkLibrary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `techType` to the `FrameworkLibrary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageId` to the `Technologies` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LanguageType" AS ENUM ('PROGRAMMING', 'STYLING', 'MARKUP');

-- DropForeignKey
ALTER TABLE "FrameworkLibrary" DROP CONSTRAINT "FrameworkLibrary_styleId_fkey";

-- DropForeignKey
ALTER TABLE "Technologies" DROP CONSTRAINT "Technologies_programmingLanguageId_fkey";

-- DropForeignKey
ALTER TABLE "Technologies" DROP CONSTRAINT "Technologies_styleId_fkey";

-- DropForeignKey
ALTER TABLE "_FrameworkLibraryToProgrammingLanguage" DROP CONSTRAINT "_FrameworkLibraryToProgrammingLanguage_A_fkey";

-- DropForeignKey
ALTER TABLE "_FrameworkLibraryToProgrammingLanguage" DROP CONSTRAINT "_FrameworkLibraryToProgrammingLanguage_B_fkey";

-- AlterTable
ALTER TABLE "Database" DROP COLUMN "category",
DROP COLUMN "type",
ADD COLUMN     "techCategory" "TechCategory" NOT NULL DEFAULT 'BACKEND',
ADD COLUMN     "techType" "DatabaseType" NOT NULL DEFAULT 'SQL';

-- AlterTable
ALTER TABLE "FrameworkLibrary" DROP COLUMN "category",
DROP COLUMN "styleId",
DROP COLUMN "type",
ADD COLUMN     "techCategory" "TechCategory" NOT NULL,
ADD COLUMN     "techType" "TechType" NOT NULL;

-- AlterTable
ALTER TABLE "Technologies" DROP COLUMN "programmingLanguageId",
DROP COLUMN "styleId",
ADD COLUMN     "languageId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ProgrammingLanguage";

-- DropTable
DROP TABLE "Style";

-- DropTable
DROP TABLE "_FrameworkLibraryToProgrammingLanguage";

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "techCategories" "TechCategory"[],
    "languageType" "LanguageType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FrameworkLibraryToLanguage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_key" ON "Language"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_FrameworkLibraryToLanguage_AB_unique" ON "_FrameworkLibraryToLanguage"("A", "B");

-- CreateIndex
CREATE INDEX "_FrameworkLibraryToLanguage_B_index" ON "_FrameworkLibraryToLanguage"("B");

-- AddForeignKey
ALTER TABLE "Technologies" ADD CONSTRAINT "Technologies_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FrameworkLibraryToLanguage" ADD CONSTRAINT "_FrameworkLibraryToLanguage_A_fkey" FOREIGN KEY ("A") REFERENCES "FrameworkLibrary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FrameworkLibraryToLanguage" ADD CONSTRAINT "_FrameworkLibraryToLanguage_B_fkey" FOREIGN KEY ("B") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;
