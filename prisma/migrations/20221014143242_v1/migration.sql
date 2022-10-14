/*
  Warnings:

  - The `moodId` column on the `Mood` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Mood" DROP COLUMN "moodId",
ADD COLUMN     "moodId" INTEGER;
