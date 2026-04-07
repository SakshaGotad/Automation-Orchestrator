/*
  Warnings:

  - You are about to drop the column `steps` on the `Workflow` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Trigger" ADD COLUMN     "connectionId" TEXT,
ALTER COLUMN "type" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Workflow" DROP COLUMN "steps";
