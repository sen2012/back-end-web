import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { name: 'tue', email:'tue@gmail.com', password: '123456', address: '39 Ly Nam De', create_at: new Date(), phone: '076272241', province: 'Thanh Pho Hue' },
      // Thêm các vai trò khác nếu cần
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });