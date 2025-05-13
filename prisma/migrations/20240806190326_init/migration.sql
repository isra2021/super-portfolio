/*
  Warnings:

  - You are about to drop the column `databaseId` on the `Technologies` table. All the data in the column will be lost.
  - You are about to drop the column `frameworkLibraryId` on the `Technologies` table. All the data in the column will be lost.
  - You are about to drop the column `languageId` on the `Technologies` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Technologies" DROP CONSTRAINT "Technologies_databaseId_fkey";

-- DropForeignKey
ALTER TABLE "Technologies" DROP CONSTRAINT "Technologies_frameworkLibraryId_fkey";

-- DropForeignKey
ALTER TABLE "Technologies" DROP CONSTRAINT "Technologies_languageId_fkey";

-- AlterTable
ALTER TABLE "Technologies" DROP COLUMN "databaseId",
DROP COLUMN "frameworkLibraryId",
DROP COLUMN "languageId";

-- CreateTable
CREATE TABLE "_LanguageToTechnologies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DatabaseToTechnologies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FrameworkLibraryToTechnologies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LanguageToTechnologies_AB_unique" ON "_LanguageToTechnologies"("A", "B");

-- CreateIndex
CREATE INDEX "_LanguageToTechnologies_B_index" ON "_LanguageToTechnologies"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DatabaseToTechnologies_AB_unique" ON "_DatabaseToTechnologies"("A", "B");

-- CreateIndex
CREATE INDEX "_DatabaseToTechnologies_B_index" ON "_DatabaseToTechnologies"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FrameworkLibraryToTechnologies_AB_unique" ON "_FrameworkLibraryToTechnologies"("A", "B");

-- CreateIndex
CREATE INDEX "_FrameworkLibraryToTechnologies_B_index" ON "_FrameworkLibraryToTechnologies"("B");

-- AddForeignKey
ALTER TABLE "_LanguageToTechnologies" ADD CONSTRAINT "_LanguageToTechnologies_A_fkey" FOREIGN KEY ("A") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LanguageToTechnologies" ADD CONSTRAINT "_LanguageToTechnologies_B_fkey" FOREIGN KEY ("B") REFERENCES "Technologies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DatabaseToTechnologies" ADD CONSTRAINT "_DatabaseToTechnologies_A_fkey" FOREIGN KEY ("A") REFERENCES "Database"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DatabaseToTechnologies" ADD CONSTRAINT "_DatabaseToTechnologies_B_fkey" FOREIGN KEY ("B") REFERENCES "Technologies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FrameworkLibraryToTechnologies" ADD CONSTRAINT "_FrameworkLibraryToTechnologies_A_fkey" FOREIGN KEY ("A") REFERENCES "FrameworkLibrary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FrameworkLibraryToTechnologies" ADD CONSTRAINT "_FrameworkLibraryToTechnologies_B_fkey" FOREIGN KEY ("B") REFERENCES "Technologies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
