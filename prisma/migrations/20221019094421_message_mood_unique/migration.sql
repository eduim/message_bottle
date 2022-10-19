/*
  Warnings:

  - A unique constraint covering the columns `[moodId]` on the table `Message` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Mood" ALTER COLUMN "mood" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Message_moodId_key" ON "Message"("moodId");
