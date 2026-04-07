/*
  Warnings:

  - Added the required column `app` to the `Trigger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trigger" ADD COLUMN     "app" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "step" INTEGER NOT NULL,
    "app" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "connectionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "Workflow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
