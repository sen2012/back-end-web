import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.categories.createMany({
    data: [
      { category_name: 'MSI', description: 'hm'},
      { category_name: 'LENOVO', description: 'hm'},
      { category_name: 'ACER', description: 'hm'},
      // Thêm các vai trò khác nếu cần
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });