/*
  Warnings:

  - You are about to drop the column `category` on the `ProgrammingLanguage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProgrammingLanguage" DROP COLUMN "category",
ADD COLUMN     "categories" "TechCategory"[];
