import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	await prisma.user.createMany({
		data: [
			{
				name: 'tue',
				email: 'tue@gmail.com',
				password: '123456',
				address: '39 Ly Nam De',
				create_at: new Date(),
				phone: '076272241',
				province: 'Thanh Pho Hue',
				role_id: 2,
			},
			{
				name: 'banh',
				email: 'huy@gmail.com',
				password: '123456',
				address: '39 Bạch Đằng',
				create_at: new Date(),
				phone: '0899318549',
				province: 'Thanh Pho Hue',
				role_id: 1,
			},
			{
				name: 'phuc',
				email: 'phucnguyen@gmail.com',
				password: '123456',
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
