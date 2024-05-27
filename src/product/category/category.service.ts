import { Injectable, NotFoundException } from '@nestjs/common'
import { Categories } from '@prisma/client'
import {
  CreateCategoryDto,
  SearchNameDto,
  SearchTypeDto,
  UpdateCategoryDto,
} from 'src/auth/dto/category.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<any> {
    const category = await this.prismaService.categories.create({
      data: createCategoryDto,
    })
    return category
  }

  async getCategories(): Promise<Categories[]> {
    return await this.prismaService.categories.findMany()
  }

  async deleteCategory(id: number) {
    const category = await this.prismaService.categories.findUnique({
      where: { id },
    })
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }
    return this.prismaService.categories.delete({ where: { id } })
  }

  async updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Categories> {
    const category = await this.prismaService.categories.findUnique({
      where: { id },
    })
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }
    return this.prismaService.categories.update({
      where: { id },
      data: updateCategoryDto,
    })
  }

  async getCategoryById(id: number): Promise<Categories> {
    const category = await this.prismaService.categories.findUnique({
      where: { id },
    })
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }
    return category
  }

  async searchName(searchNameDto: SearchNameDto) {
    return this.prismaService.categories.findMany({
      where: {
        category_name: {
          contains: searchNameDto.category_name,
        },
      },
    })
  }

  async searchByType(searchTypeDto: SearchTypeDto){
    return this.prismaService.categories.findMany({
      where: {
        type:{
          contains: searchTypeDto.type
        }
      }
    })
  }
}
