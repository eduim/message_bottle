-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "github_token" TEXT NOT NULL,
    "github_token_expires" INTEGER NOT NULL,
    "github_user" TEXT NOT NULL,
    "token" TEXT,
    "int_start_date" BOOLEAN NOT NULL DEFAULT false,
    "start_date" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mood" (
    "id" SERIAL NOT NULL,
    "moodId" INTEGER,
    "postDate" TEXT,
    "userId" INTEGER,

    CONSTRAINT "Mood_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mood_userId_key" ON "Mood"("userId");

-- AddForeignKey
ALTER TABLE "Mood" ADD CONSTRAINT "Mood_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
