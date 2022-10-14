/*
  Warnings:

  - You are about to drop the column `moodEmoji` on the `Mood` table. All the data in the column will be lost.
  - Added the required column `moodId` to the `Mood` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mood" DROP COLUMN "moodEmoji",
DROP COLUMN "moodId",
ADD COLUMN     "moodId" INTEGER NOT NULL;
