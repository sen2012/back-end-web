import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	await prisma.categories.createMany({
		data: [
			{ category_name: 'ASUS', description: 'Asus Tek Computer Inc' },
			{ category_name: 'DELL', description: 'Dell Inc' },
			{ category_name: 'HP', description: 'Hewlett-Packard' },
			{ category_name: 'Acer', description: 'Acer Inc' },
			{ category_name: 'MacBook', description: 'Macbook apple' },
			{ category_name: 'Lenovo', description: 'Lenovo Group Ltd' },
			// Thêm các vai trò khác nếu cần
		],
	})
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect()
	})
