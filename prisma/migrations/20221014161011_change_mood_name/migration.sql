/*
  Warnings:

  - You are about to drop the column `moodId` on the `Mood` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Mood" DROP COLUMN "moodId",
ADD COLUMN     "mood" INTEGER;
