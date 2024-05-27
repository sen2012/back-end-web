import { Injectable, NotFoundException } from '@nestjs/common'
import { Product } from '@prisma/client'
import {
  CreateProductDto,
  FindProductDto,
  UpdateProductDto,
} from 'src/auth/dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  //create product
  async createProduct(createProductDto: CreateProductDto) {
    const currentUTCTime = Date.now()
    const utcPlus7Time = currentUTCTime + 7 * 60 * 60 * 1000
    const product = await this.prismaService.product.create({
      data: {
        product_name: createProductDto.product_name,
        description: createProductDto.description,
        price: createProductDto.price,
        photo: createProductDto.photo,
        unit: createProductDto.unit,
        category_id: createProductDto.category_id,
        create_at: new Date(utcPlus7Time),
        quantity: createProductDto.quantity,
        sold: 0
      },
    })
    return product
  }

  //list tất cả các product
  async getProduct(): Promise<Product[]> {
    return await this.prismaService.product.findMany()
  }

  //delete product theo id
  async deleteProduct(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    })
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`)
    }
    return this.prismaService.product.delete({ where: { id } })
  }

  //update product theo id
  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    })
    if (updateProductDto.price && typeof updateProductDto.price === 'string') {
      updateProductDto.price = parseFloat(updateProductDto.price)
    }
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`)
    }
    return this.prismaService.product.update({
      where: { id },
      data: updateProductDto,
    })
  }

  //Đưa dữ liệu ra theo id product
  async getProductById(id: number): Promise<Product> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    })
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`)
    }
    return product
  }

  async searchProduct(findProductDto: FindProductDto) {
    return this.prismaService.product.findMany({
      where: {
        product_name: {
          contains: findProductDto.name, // Tìm kiếm tất cả các sản phẩm có tên chứa đựng phần của chuỗi tìm kiếm
        },
        category: {
          id: findProductDto.categoryId,
        },
        price: {
          gte: findProductDto.minPrice,
          lte: findProductDto.maxPrice,
        },
      },
    })
  }
}
