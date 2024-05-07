import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
        { product_name: 'Laptop Lenovo', photo:'lenovo.png', description:'32', price: 123, unit: 'cai', category_id: 2, create_at: new Date()},
        { product_name: 'Laptop Acer', photo:'acer.png', description:'123', price: 123, unit: 'cai', category_id: 3, create_at: new Date()},
        { product_name: 'Laptop Msi', photo:'msi.png', description:'112', price: 123, unit: 'cai', category_id: 1, create_at: new Date()},

      // Thêm các vai trò khác nếu cần
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });