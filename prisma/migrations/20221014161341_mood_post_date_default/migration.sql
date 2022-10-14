/*
  Warnings:

  - The `postDate` column on the `Mood` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Mood" DROP COLUMN "postDate",
ADD COLUMN     "postDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
