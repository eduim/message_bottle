/*
  Warnings:

  - You are about to drop the column `github_token` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `github_token_expires` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `github_user` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `int_start_date` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `User` table. All the data in the column will be lost.
  - Added the required column `githubToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `githubTokenExpires` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `githubUser` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "github_token",
DROP COLUMN "github_token_expires",
DROP COLUMN "github_user",
DROP COLUMN "int_start_date",
DROP COLUMN "start_date",
ADD COLUMN     "githubToken" TEXT NOT NULL,
ADD COLUMN     "githubTokenExpires" INTEGER NOT NULL,
ADD COLUMN     "githubUser" TEXT NOT NULL,
ADD COLUMN     "intStartDate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "startDate" INTEGER;
