-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_payment_id_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "payment_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
