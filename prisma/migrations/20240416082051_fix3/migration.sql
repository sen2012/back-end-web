/*
  Warnings:

  - You are about to drop the column `delivery_address` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_province` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "delivery_address",
DROP COLUMN "delivery_province";
