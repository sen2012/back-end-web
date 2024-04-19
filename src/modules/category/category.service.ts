import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from 'src/auth/dto/category.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
    constructor(private prismaService: PrismaService){

    }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<any> {
        const category = await this.prismaService.categories.create({
          data: createCategoryDto,
        });
        return category;
      }

}
