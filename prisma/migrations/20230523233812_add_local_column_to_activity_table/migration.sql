/*
  Warnings:

  - Added the required column `local` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "local" TEXT NOT NULL;
