/*
  Warnings:

  - You are about to drop the column `github_id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "github_id",
ADD COLUMN     "token" TEXT,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "User_id_seq";
