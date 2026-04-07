/*
  Warnings:

  - Added the required column `event` to the `Trigger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Workflow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trigger" ADD COLUMN     "event" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Workflow" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Connection" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "app" TEXT NOT NULL,
    "accessToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);
