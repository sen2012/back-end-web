import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.post.createMany({
    data: [
      { title: 'Giảm giá', content:'Giảm giá laptop lên đến 10% cho sinh viên', image: 'slider_1.jpg', published: true},
      { title: 'Giảm giá', content:'Giảm giá laptop lên đến 10% cho sinh viên', image: 'slider_7.png', published: true},
      { title: 'Giảm giá', content:'Giảm giá laptop lên đến 10% cho sinh viên', image: 'slider_4.png', published: true},
      { title: 'Giảm giá', content:'Giảm giá laptop lên đến 10% cho sinh viên', image: 'slider_5.png', published: true},
      // Thêm các vai trò khác nếu cần
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });