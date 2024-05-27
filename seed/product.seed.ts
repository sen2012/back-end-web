import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	await prisma.product.createMany({
		data: [
			{
				product_name: 'ASUS K45A-VX229',
				photo: 'anh1.jpg',
				description:
					'Laptop ASUS VivoBook S410UA là sự kết hợp hoàn hảo giữa vẻ đẹp và hiệu năng. Với thiết kế viền máy NanoEdge mỏng, cùng vỏ ngoài hoàn thiện với chất liệu kim loại, máy lý tưởng để đồng hành cùng bạn trên khắp nẻo đường. ASUS VivoBook S410UA được trang bị một cấu hình mạnh mẽ đáp ứng được mọi tác vụ đa dạng và phức tạp, hoàn toàn thích hợp cho nhu cầu làm việc lẫn giải trí của người dùng.',
				price: 11000000,
				unit: 'đ',
				category_id: 1,
				create_at: new Date(),
				quantity: 10
			},
			{
				product_name: 'MacBook Air 15 inch',
				photo: 'anh2.jpg',
				description:
					'MacBook Air M2 2023 15 inch (16GB/512GB SSD) là một sản phẩm của Apple, thương hiệu nổi tiếng với sự kết hợp tinh tế giữa thiết kế và hiệu suất đỉnh cao. Trong đó, MacBook Air M2 2023 15 inch (16GB/512GB SSD) nổi bật với sự mạnh mẽ và tính di động cao, là sản phẩm phục vụ tốt cho nhu cầu văn phòng, đồ họa - kỹ thuật, doanh nghiệp và doanh nhân.',
				price: 29490000,
				unit: 'đ',
				category_id: 5,
				create_at: new Date(),
				quantity: 10
			},
			{
				product_name: 'MacBook Air M1  ',
				photo: 'anh3.jpg',
				description:
					'Laptop MacBook Air 2020 13 inch là dòng laptop cao cấp đến từ thương hiệu Apple nổi tiếng. Chiếc Macbook Air thế hệ mới sở hữu vẻ đẹp tinh tế cùng hiệu năng mạnh mẽ đến từ con chip Apple M1. Đây sẽ là một chiếc laptop phù hợp với nhiều người dùng trong công việc và giải trí.',
				price: 18590000,
				unit: 'đ',
				category_id: 5,
				create_at: new Date(),
				quantity: 10
			},
			{
				product_name: 'Asus Vivobook Go 15',
				photo: 'anh4.jpg',
				description:
					'Laptop ASUS VivoBook Go 15 E1504FA-NJ454W được thiết kế tinh tế với kích thước mỏng nhẹ, chỉ nặng 1,8kg và có độ mỏng 17,9mm trong khung máy 15.6 inch. Điều này giúp tăng cường tính di động và linh hoạt của sản phẩm, cho phép bạn dễ dàng mang theo chỉ bằng một tay. Bản lề có khả năng duỗi thẳng 180°, mang lại sự tiện lợi tuyệt vời và phù hợp cho mọi người dùng, bao gồm học sinh, sinh viên và nhân viên văn phòng. Bạn có thể dễ dàng chia sẻ nội dung hoặc làm việc nhóm một cách thuận tiện.',
				price: 16500000,
				unit: 'đ',
				category_id: 1,
				create_at: new Date(),
				quantity: 10
			},
			{
				product_name: 'Asus TUF Gaming FX50',
				photo: 'anh5.jpg',
				description:
					'Chiếc laptop Asus TUF Gaming F15 FX506HE-HN075W được chế tạo bằng chất liệu nhựa cao cấp, tạo nên một cấu trúc vô cùng chắc chắn. Khung máy đảm bảo độ bền cao, khả năng chống va đập, phù hợp với người chơi chuyên nghiệp. Thiết kế của laptop không chỉ mạnh mẽ mà còn thể hiện phong cách gaming tinh tế với những đường nét sắc sảo, chuẩn mực cho các game thủ.',
				price: 19490000,
				unit: 'đ',
				category_id: 1,
				create_at: new Date(),
				quantity: 10
			},
			{
				product_name: 'Lenovo IdeaPad Slim 5',
				photo: 'anh6.jpg',
				description:
					'Laptop Lenovo IdeaPad 5 14IAH8 - 83BF002NVN là một sản phẩm laptop đang được ưa chuộng hiện nay. Máy tính cầm tay này trang bị bộ vi xử lý Intel Core i5-12450H cùng dung lượng ổ cứng 512Gb SSD M.2 NVMe có thể đáp ứng tốt các tác vụ văn phòng, học tập một cách tối ưu. ',
				price: 15490000,
				unit: 'đ',
				category_id: 6,
				create_at: new Date(),
				quantity: 10
			},
			{
				product_name: 'Acer Aspire 3 A315',
				photo: 'anh7.jpg',
				description:
					'Laptop Acer Aspire 3 A315-59-381E được thiết kế với gam màu bạc chủ đạo mang đến sự sang trọng, tinh tế. Laptop trang bị CPU Core i3 cùng chip đồ họa tích hợp Onboard Intel UHD Graphics được sử dụng dành cho các tác vụ như công việc văn phòng, học tập hay giải trí cơ bản.',
				price: 9990000,
				unit: 'đ',
				category_id: 4,
				create_at: new Date(),
				quantity: 10
			},
			{
				product_name: 'Acer Aspire 5 A515',
				photo: 'anh8.jpg',
				description:
					'Laptop ACER Aspire 5 A515-58GM-59LJ sở hữu hiệu năng ổn định Core i5 cùng card RTX 2050 4GB GDDR6 có thể xử lý được các ứng dụng đồ họa, chỉnh sửa video và thiết kế đa phương tiện như Adobe. Laptop cũng có màn hình 15.6 inch độ phân giải Full HD nhằm mang lại hình ảnh sắc nét và chi tiết cũng như góc nhìn lớn hơn mà không mất màu sắc ban đầu.',
				price: 15999000,
				unit: 'đ',
				category_id: 4,
				create_at: new Date(),
				quantity: 10
			},
			{
				product_name: 'Lenovo IdeaPad 3 15IAU7',
				photo: 'anh9.jpg',
				description:
					'Laptop Lenovo IdeaPad 3 15IAU7 - 82RK001QVN mang đến trải nghiệm tuyệt vời cho người dùng nhờ việc sở hữu hiệu năng mạnh mẽ với CPU Intel Core i5 xử lý tốt các dữ liệu ',
				price: 10790000,
				unit: 'đ',
				category_id: 6,
				create_at: new Date(),
				quantity: 10
			},
			{
				product_name: 'Acer Nitro 16 Phoenix',
				photo: 'anh10.jpg',
				description:
					'Acer Nitro 16 Phoenix AN16-41-R5M4 - Laptop Gaming Quốc Dân Laptop Gaming Quốc Dân là một thuật ngữ được sử dụng để chỉ những chiếc laptop chơi game có cấu hình mạnh mẽ và thiết kế đẹp mắt, phù hợp với nhu cầu của người chơi game. Acer Nitro 16 Phoenix là một chiếc laptop Acer gaming ấn tượng với thiết kế cấu trúc gaming từ bên ngoài cho đến vỏ hộp. Thiết kế này tạo nên một phong cách mạnh mẽ, độc đáo và tinh tế. Máy tính còn được điểm xuyết bởi các viền neon tinh tế, tạo sự hòa hợp và thu hút mọi ánh nhìn đến từ góc setup của game thủ.',
				price: 25690000,
				unit: 'đ',
				category_id: 4,
				create_at: new Date(),
				quantity: 10
			},
			{
				product_name: 'HP Pavilion X360 1047',
				photo: 'anh11.jpg',
				description:
					'Laptop HP Pavilion X360 14 i7-ek1047TU - 80R25PA có đầy đủ những yếu tố của một dòng sản phẩm cao cấp. Một chiếc laptop văn phòng với thiết kế tinh tế, sang trọng cùng hiệu năng mạnh mẽ nhờ bộ vi xử lý Intel Core i7. Nếu bạn đang tìm kiếm một thiết bị đáp ứng tốt nhu cầu văn phòng hoặc thiết kế cơ bản thì đây chính là sự lựa chọn hoàn hảo.',
				price: 24590000,
				unit: 'đ',
				category_id: 3,
				create_at: new Date(),
				quantity: 10
			},
			{
				product_name: 'Dell Inspiron 16 5630',
				photo: 'anh12.jpg',
				description:
					'Laptop Dell Inspiron 16 5630 - i7P165W11SL2050 sở hữu hiệu suất mạnh mẽ của con chip Intel Core i7-1360P cùng card đồ họa RTX 2050 4GB GDDR6 giúp chiếc laptop này sẽ bạn hoàn thành những tác vụ học tập, công việc hay giải trí một cách tối ưu nhất. Đây là một trong những sản phẩm máy tính đang được giới văn phòng ưa chuộng. ',
				price: 28590000,
				unit: 'đ',
				category_id: 2,
				create_at: new Date(),
				quantity: 10
			},
			{
				product_name: 'Dell Vostro 16 5630',
				photo: 'anh13.jpg',
				description:
					'Laptop Dell Vostro 16 5630 THT7N i7-1360P nổi bật với thiết kế bền bỉ cùng hiệu suất ấn tượng có thể đáp ứng mọi nhu cầu giải trí và làm việc của bạn. Dòng sản phẩm đến từ thương hiệu Dell  sở hữu màn hình lớn  16 inch và tích hợp đa dạng cổng kết nối. ',
				price: 27690000,
				unit: 'đ',
				category_id: 2,
				create_at: new Date(),
				quantity: 10
			},
			{
				product_name: 'ASUS ROG Strix SCAR 16',
				photo: 'anh14.jpg',
				description:
					'Laptop ASUS ROG Strix SCAR luôn là đầu tàu trong dải sản phẩm Laptop Gaming của ROG. ROG Strix SCAR 16 và 18 với khung máy hoàn toàn mới và màn hình tỷ lệ 16:10 thời thượng, trang bị tấm nền lên đên 2K 240Hz, đạt chuẩn ROG Nebula. Bộ vi xử lý CPU Intel Core™ i9 13980HX cho hiệu năng chơi game tuyệt đỉnh với GPU NVIDIA GeForce RTX 4080 Laptop cùng hệ thống tản nhiệt tân tiến mang đến trải nghiệm chơi game mượt mà nhất trên nền tảng đồ họa đến từ tương lai.',
				price: 69990000,
				unit: 'đ',
				category_id: 1,
				create_at: new Date(),
				quantity: 10
			},

			{
				product_name: 'HP Victus 16-s0077AX',
				photo: 'anh15.jpg',
				description:
					'Laptop HP Victus 16-s0077AX (8C5N6PA) được trang bị bộ xử lý AMD Ryzen 7 7840HS mạnh mẽ, card đồ họa RTX 3050 6GB GDDR6/AMD Radeon 780M hiện đại và bộ lưu trữ lớn 512GB SSD M.2 NVMe. Đây là chiếc laptop Gaming cao cấp có thể hỗ trợ tốt quá trình làm việc, học tập, chơi game cấu hình nặng.',
				price: 25990000,
				unit: 'đ',
				category_id: 3,
				create_at: new Date(),
				quantity: 10
			},
			{
				product_name: 'MacBook Pro M2',
				photo: 'anh16.jpg',
				description:
					'MacBook Pro M2 2022 13 inch (16GB/512GB SSD) sở hữu ngoại hình vô cùng ấn tượng nhờ được hoàn thiện từ hợp kim nguyên khối cùng những đường nét cứng cáp. Với thiết kế nhỏ gọn, MacBook Pro M2 2022 13 inch có kích thước 30.41 x 21.24 x 1.56 cm và nặng 1.4 kg, rất tiện lợi để mang theo bên mình mọi lúc mọi nơi.',
				price: 40890000,
				unit: 'đ',
				category_id: 5,
				create_at: new Date(),
				quantity: 10
			},
			{
				product_name: 'HP ProBook 450 G10',
				photo: 'anh17.jpg',
				description:
					'HP ProBook 450 G10 - 9H8W0PT là một sự kết hợp tinh tế giữa thiết kế bền bỉ, hiệu suất vượt trội và tính năng bảo mật tiên tiến. Với các công nghệ mới nhất được tích hợp, chiếc laptop này không chỉ đáp ứng đầy đủ các yêu cầu của công việc kinh doanh mà còn mang lại trải nghiệm người dùng độc đáo và thoải mái.',
				price: 24990000,
				unit: 'đ',
				category_id: 3,
				create_at: new Date(),
				quantity: 10
			},
			{
				product_name: 'HP EliteBook 640 G10',
				photo: 'anh18.jpg',
				description:
					'HP EliteBook 640 G10 (873G4PA) là một sản phẩm laptop cao cấp từ hãng HP - một trong những thương hiệu hàng đầu và được tin dùng trong lĩnh vực công nghệ. Điểm đặc biệt của sản phẩm này là sự kết hợp giữa hiệu suất mạnh mẽ và thiết kế nhỏ gọn, phù hợp với nhu cầu di động của người dùng hiện đại.',
				price: 23490000,
				unit: 'đ',
				category_id: 3,
				create_at: new Date(),
				quantity: 10
			},
			{
				product_name: 'Lenovo Legion Pro 5',
				photo: 'anh19.jpg',
				description:
					'Laptop Lenovo Legion Pro 5 16IRX9 83DF0047VN là sự lựa chọn hàng đầu cho những ai đang tìm kiếm một chiếc laptop gaming cao cấp. Với vi xử lý Intel Core i9-14900HX và card đồ họa NVIDIA GeForce RTX 4060, bạn sẽ thưởng thức trải nghiệm chơi game mượt mà nhất. Màn hình 16 inch WQXGA 240Hz, RAM 32GB DDR5 và ổ cứng SSD 1TB NVMe PCIe tốc độ cao đảm bảo bạn có thể chinh phục mọi tựa game một cách dễ dàng. Thiết kế sang trọng, hệ thống tản nhiệt hiệu quả và kết nối đa dạng đảm bảo trải nghiệm chơi game hoàn hảo.',
				price: 45990000,
				unit: 'đ',
				category_id: 6,
				create_at: new Date(),
				quantity: 10
			},
			{
				product_name: ' Asus Zenbook 14 OLED',
				photo: 'anh20.jpg',
				description:
					'Laptop ASUS Zenbook 14 OLED - UX3405MA-PP588W là một sản phẩm laptop Intel Core Ultra cao cấp từ thương hiệu ASUS, được biết đến với sự kỹ lưỡng trong thiết kế và hiệu suất ổn định. Sản phẩm này kết hợp giữa hiệu suất mạnh mẽ và thiết kế siêu mỏng, phù hợp với nhu cầu di động của người dùng hiện đại.',
				price: 26900000,
				unit: 'đ',
				category_id: 1,
				create_at: new Date(),
				quantity: 10
			},
			{
				product_name: 'Asus Vivobook 15',
				photo: 'anh21.jpg',
				description:
					'Là dòng laptop văn phòng đầy hứa hẹn của ASUS nên không lạ khi chiếc ASUS Vivobook 15 OLED A1505VA-L1491W rất nổi bật với thiết kế trẻ trung và hiện đại. Với những người dùng đang kiếm tìm một sản phẩm laptop mỏng nhẹ và thời trang thì chiếc Vivobook 15 OLED A1505VA-L1491W là sự lựa chọn tuyệt vời.',
				price: 19990000,
				unit: 'đ',
				category_id: 1,
				create_at: new Date(),
				quantity: 10
			},
			{
				product_name: 'ACER Nitro 5 Eagle AN515',
				photo: 'anh22.jpg',
				description:
					'Là dòng laptop gaming của thương hiệu Acer, laptop Acer Nitro 5 Eagle AN515-57-54MV được trang bị chip i5 mạnh mẽ, card đồ họa NVIDIA GeForce RTX 3050, ram 8Gb cùng dung lượng lớn. Kết hợp với thiết kế đẹp và mạnh mẽ, đây sẽ là sự lựa chọn dành cho các game thủ trẻ và người làm công việc liên quan đến đồ họa.',
				price: 25990000,
				unit: 'đ',
				category_id: 4,
				create_at: new Date(),
				quantity: 10
			},
			{
				product_name: 'Dell Inspiron 3530',
				photo: 'anh23.jpg',
				description:
					'Laptop Dell Inspiron 3530 - N3530I716W1 là dòng laptop văn phòng hữu dụng, được xây dựng với bộ vi xử lý Intel thế hệ thứ 13, cho phép hoàn thành danh sách công việc đồ sộ mỗi ngày trong trải nghiệm mượt mà và trơn tru.',
				price: 23390000,
				unit: 'đ',
				category_id: 2,
				create_at: new Date(),
				quantity: 10
			},
			{
				product_name: 'MacBook Air 2023 15.3',
				photo: 'anh24.jpg',
				description:
					'MacBook Air M2 2023 15 inch (8GB/512GB SSD) sở hữu một ngoại hình cực nhỏ gọn với kích thước 1.15 x 34.04 x 23.76 cm và cân nặng chỉ 1.5 kg. Thiết kế siêu mỏng nhẹ của sản phẩm giúp người dùng dễ dàng mang theo và sử dụng ở mọi nơi mà không cảm thấy cồng kềnh.',
				price: 30900000,
				unit: 'đ',
				category_id: 5,
				create_at: new Date(),
				quantity: 10
			},
			{
				product_name: 'HP ProBook 450 G10',
				photo: 'anh25.jpg',
				description:
					'Laptop HP ProBook 450 G10 - 873L0PA được trang bị CPU i7-1360P mạnh mẽ của Intel cùng màn hình cảm ứng phù hợp cho dân văn phòng. Đặc biệt là giới doanh nhân đang tìm kiếm một chiếc laptop không chỉ có cấu hình cao mà còn có thiết kế đẹp mắt và hiện đại.',
				price: 24990000,
				unit: 'đ',
				category_id: 3,
				create_at: new Date(),
				quantity: 10
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
