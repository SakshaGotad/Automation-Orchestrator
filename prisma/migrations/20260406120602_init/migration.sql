/*
  Warnings:

  - You are about to drop the column `app` on the `Connection` table. All the data in the column will be lost.
  - Added the required column `provider` to the `Connection` table without a default value. This is not possible if the table is not empty.
  - Made the column `accessToken` on table `Connection` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Connection" DROP COLUMN "app",
ADD COLUMN     "provider" TEXT NOT NULL,
ADD COLUMN     "refreshToken" TEXT,
ALTER COLUMN "accessToken" SET NOT NULL;
