/*
  Warnings:

  - You are about to drop the column `user_id` on the `OrderDetail` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderDetail" DROP CONSTRAINT "OrderDetail_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_order_detail_id_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "modified_at" TIMESTAMP(3),
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OrderDetail" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "paymment_date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "create_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "create_at" TIMESTAMP(3),
ADD COLUMN     "roles" TEXT;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
