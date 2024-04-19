import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from 'src/auth/dto';
import { CategoryService } from './category.service';

@ApiBearerAuth()
@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService){

    }

    @Get()
    getCategory(){

    }

    @Post()
    async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        const category = await this.categoryService.createCategory(createCategoryDto);
        return category; // You can return the created category as a response
      }

    @Get(':id')
    detailCategory(){

    }

    @Put(':id')
    updateCategory(){

    }

    @Delete(':id')
    deleteCategory(){

    }
}
