import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	await prisma.categories.createMany({
		data: [
			{ category_name: 'ASUS', description: 'Asus Tek Computer Inc', type: 'Laptop'},
			{ category_name: 'DELL', description: 'Dell Inc', type: 'Laptop' },
			{ category_name: 'HP', description: 'Hewlett-Packard', type: 'Laptop' },
			{ category_name: 'Acer', description: 'Acer Inc', type: 'Laptop'},
			{ category_name: 'MacBook', description: 'Macbook apple', type: 'Laptop' },
			{ category_name: 'Lenovo', description: 'Lenovo Group Ltd', type: 'Laptop' },
			// Thêm các vai trò khác nếu cần
		],
	})
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect()
	})
