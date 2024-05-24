/*
  Warnings:

  - Made the column `type` on table `Categories` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Categories" ALTER COLUMN "type" SET NOT NULL;
