-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "order_detail_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_order_detail_id_fkey" FOREIGN KEY ("order_detail_id") REFERENCES "OrderDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;
