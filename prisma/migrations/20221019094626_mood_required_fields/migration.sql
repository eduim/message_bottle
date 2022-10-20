/*
  Warnings:

  - Made the column `userId` on table `Mood` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mood` on table `Mood` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Mood" DROP CONSTRAINT "Mood_userId_fkey";

-- AlterTable
ALTER TABLE "Mood" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "mood" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Mood" ADD CONSTRAINT "Mood_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
