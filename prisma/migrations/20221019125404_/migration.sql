/*
  Warnings:

  - You are about to drop the column `mood` on the `Message` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[moodId]` on the table `Message` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `moodId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "mood",
ADD COLUMN     "moodId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Message_moodId_key" ON "Message"("moodId");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_moodId_fkey" FOREIGN KEY ("moodId") REFERENCES "Mood"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
