import { Injectable, NotFoundException } from "@nestjs/common";
import { Categories } from "@prisma/client";
import { CreateCategoryDto } from "src/auth/dto/category.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<any> {
    const category = await this.prismaService.categories.create({
      data: createCategoryDto,
    });
    return category;
  }

  async getCategories(): Promise<Categories[]> {
    return await this.prismaService.categories.findMany();
  }

  async deleteCategory(id: number) {
    const category = await this.prismaService.categories.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return this.prismaService.categories.delete({ where: { id } });
  }

  async updateCategory(
    id: number,
    newData: Partial<Categories>,
  ): Promise<Categories> {
    const category = await this.prismaService.categories.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return this.prismaService.categories.update({
      where: { id },
      data: newData,
    });
  }

  async getCategoryById(id: number): Promise<Categories> {
    const category = await this.prismaService.categories.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }
}
