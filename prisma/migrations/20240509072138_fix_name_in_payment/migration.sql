/*
  Warnings:

  - You are about to drop the column `paymment_date` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "paymment_date",
ADD COLUMN     "payment_date" TIMESTAMP(3);
