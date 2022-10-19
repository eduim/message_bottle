/*
  Warnings:

  - Made the column `mood` on table `Mood` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Mood" ALTER COLUMN "mood" SET NOT NULL;
