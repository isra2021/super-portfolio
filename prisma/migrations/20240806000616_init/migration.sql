-- CreateEnum
CREATE TYPE "DatabaseType" AS ENUM ('SQL', 'NOSQL');

-- AlterTable
ALTER TABLE "FrameworkLibrary" ADD COLUMN     "styleId" INTEGER;

-- AlterTable
ALTER TABLE "Technologies" ADD COLUMN     "databaseId" INTEGER,
ADD COLUMN     "styleId" INTEGER;

-- CreateTable
CREATE TABLE "Style" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" "TechCategory" NOT NULL DEFAULT 'FRONTEND',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Style_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Database" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" "TechCategory" NOT NULL DEFAULT 'BACKEND',
    "type" "DatabaseType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Database_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Style_name_key" ON "Style"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Database_name_key" ON "Database"("name");

-- AddForeignKey
ALTER TABLE "FrameworkLibrary" ADD CONSTRAINT "FrameworkLibrary_styleId_fkey" FOREIGN KEY ("styleId") REFERENCES "Style"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Technologies" ADD CONSTRAINT "Technologies_styleId_fkey" FOREIGN KEY ("styleId") REFERENCES "Style"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Technologies" ADD CONSTRAINT "Technologies_databaseId_fkey" FOREIGN KEY ("databaseId") REFERENCES "Database"("id") ON DELETE SET NULL ON UPDATE CASCADE;
