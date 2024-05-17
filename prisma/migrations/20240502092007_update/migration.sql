/*
  Warnings:

  - You are about to drop the column `categoryName` on the `Categories` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `OrderDetail` table. All the data in the column will be lost.
  - You are about to drop the column `deliveryAddress` on the `OrderDetail` table. All the data in the column will be lost.
  - You are about to drop the column `deliveryProvince` on the `OrderDetail` table. All the data in the column will be lost.
  - You are about to drop the column `finishedTime` on the `OrderDetail` table. All the data in the column will be lost.
  - You are about to drop the column `orderTime` on the `OrderDetail` table. All the data in the column will be lost.
  - You are about to drop the column `shippedTime` on the `OrderDetail` table. All the data in the column will be lost.
  - You are about to drop the column `shipperId` on the `OrderDetail` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `OrderDetail` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productName` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Shipper` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category_name` to the `Categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_name` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_productId_fkey";

-- DropForeignKey
ALTER TABLE "OrderDetail" DROP CONSTRAINT "OrderDetail_shipperId_fkey";

-- DropForeignKey
ALTER TABLE "OrderDetail" DROP CONSTRAINT "OrderDetail_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "categoryName",
ADD COLUMN     "category_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "price",
DROP COLUMN "productId",
DROP COLUMN "quantity",
ADD COLUMN     "create_at" TIMESTAMP(3),
ADD COLUMN     "modified_at" TIMESTAMP(3),
ADD COLUMN     "order_time" TIMESTAMP(3),
ADD COLUMN     "payment_id" INTEGER NOT NULL,
ADD COLUMN     "status" BOOLEAN,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OrderDetail" DROP COLUMN "Status",
DROP COLUMN "deliveryAddress",
DROP COLUMN "deliveryProvince",
DROP COLUMN "finishedTime",
DROP COLUMN "orderTime",
DROP COLUMN "shippedTime",
DROP COLUMN "shipperId",
DROP COLUMN "userId",
ADD COLUMN     "order_id" INTEGER NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "product_id" INTEGER NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "authorId";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categoryId",
DROP COLUMN "productName",
ADD COLUMN     "category_id" INTEGER,
ADD COLUMN     "create_at" TIMESTAMP(3),
ADD COLUMN     "product_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "create_at" TIMESTAMP(3),
ADD COLUMN     "role_id" INTEGER;

-- DropTable
DROP TABLE "Employee";

-- DropTable
DROP TABLE "Shipper";

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "role_name" TEXT,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "payment_method" TEXT NOT NULL,
    "paymment_date" TIMESTAMP(3),

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
