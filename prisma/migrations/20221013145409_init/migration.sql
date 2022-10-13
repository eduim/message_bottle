-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "github_token" TEXT NOT NULL,
    "github_token_expires" INTEGER NOT NULL,
    "github_user" TEXT NOT NULL,
    "github_id" INTEGER NOT NULL,
    "int_start_date" BOOLEAN NOT NULL DEFAULT false,
    "start_date" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
