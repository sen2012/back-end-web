/*
  Warnings:

  - You are about to drop the column `productName` on the `Product` table. All the data in the column will be lost.
  - Added the required column `product_name` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "create_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "productName",
ADD COLUMN     "product_name" TEXT NOT NULL;
