/*
  Warnings:

  - You are about to drop the column `languageId` on the `FrameworkLibrary` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "FrameworkLibrary" DROP CONSTRAINT "FrameworkLibrary_languageId_fkey";

-- AlterTable
ALTER TABLE "FrameworkLibrary" DROP COLUMN "languageId";

-- CreateTable
CREATE TABLE "_FrameworkLibraryToProgrammingLanguage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FrameworkLibraryToProgrammingLanguage_AB_unique" ON "_FrameworkLibraryToProgrammingLanguage"("A", "B");

-- CreateIndex
CREATE INDEX "_FrameworkLibraryToProgrammingLanguage_B_index" ON "_FrameworkLibraryToProgrammingLanguage"("B");

-- AddForeignKey
ALTER TABLE "_FrameworkLibraryToProgrammingLanguage" ADD CONSTRAINT "_FrameworkLibraryToProgrammingLanguage_A_fkey" FOREIGN KEY ("A") REFERENCES "FrameworkLibrary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FrameworkLibraryToProgrammingLanguage" ADD CONSTRAINT "_FrameworkLibraryToProgrammingLanguage_B_fkey" FOREIGN KEY ("B") REFERENCES "ProgrammingLanguage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
