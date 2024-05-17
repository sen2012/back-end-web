import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	await prisma.role.createMany({
		data: [
			{ role_name: 'Customer' },
			{ role_name: 'Admin' },
			// Thêm các vai trò khác nếu cần
		],
	})
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect()
	})
