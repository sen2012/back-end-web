import { PrismaClient } from '@prisma/client'
import * as argon from 'argon2'
import { RegisterDto } from 'src/auth/dto'

const prisma = new PrismaClient()
async function hashPassword(password: string): Promise<string> {
	try {
	  const hashedPassword = await argon.hash(password);
	  return hashedPassword;
	} catch (error) {
	  throw new Error('Lỗi khi mã hóa mật khẩu');
	}
}


async function main() {
	const hashedPassword = await hashPassword('123456');
	await prisma.user.createMany({
		data: [
			{
				name: 'tue',
				email: 'tue@gmail.com',
				password: hashedPassword,
				address: '39 Ly Nam De',
				create_at: new Date(),
				phone: '076272241',
				province: 'Thanh Pho Hue',
				role_id: 2,
			},
			{
				name: 'banh',
				email: 'huy@gmail.com',
				password: hashedPassword,
				address: '39 Bạch Đằng',
				create_at: new Date(),
				phone: '0899318549',
				province: 'Thanh Pho Hue',
				role_id: 1,
			},
			{
				name: 'phuc',
				email: 'phucnguyen@gmail.com',
				password: hashedPassword,
				address: 'Huong Long',
				create_at: new Date(),
				phone: '0899318549',
				province: 'Thanh Pho Hue',
				role_id: 1,
			},
			// Thêm các vai trò khác nếu cần
		],
	})
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect()
	})
