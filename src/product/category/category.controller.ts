import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import {
  CreateCategoryDto,
  SearchNameDto,
  SearchTypeDto,
  UpdateCategoryDto,
} from 'src/auth/dto'
import { CategoryService } from './category.service'
import { Categories } from '@prisma/client'
import { CategoryDto } from './category.model'

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiResponse({
    status: 200,
    description: 'successful operation',
    type: CategoryDto,
  })
  @Get()
  async getCategory(): Promise<Categories[]> {
    return await this.categoryService.getCategories()
  }

  @ApiResponse({
    status: 201,
    description: 'Create category success',
    type: CreateCategoryDto,
  })
  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const category =
      await this.categoryService.createCategory(createCategoryDto)
    return category // You can return the created category as a response
  }

  @ApiResponse({
    status: 200,
    description: 'successful operation',
    type: CategoryDto,
  })
  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<Categories> {
    const category = await this.categoryService.getCategoryById(
      parseInt(id, 10),
    )
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }
    return category
  }

  @ApiResponse({
    status: 201,
    description: 'Update category success',
    type: UpdateCategoryDto,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Categories> {
    const updatedCategory = await this.categoryService.updateCategory(
      parseInt(id, 10),
      updateCategoryDto,
    )
    if (!updatedCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }
    return updatedCategory
  }

  @ApiResponse({
    status: 200,
    description: 'Delete category success',
    type: CreateCategoryDto,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    const deletedCategory = await this.categoryService.deleteCategory(
      parseInt(id, 10),
    )
    if (!deletedCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }
    return { message: `Category with ID ${id} has been deleted` }
  }

  @ApiResponse({
    status: 201,
    description: 'successful operation',
    type: CategoryDto,
  })
  @Post('search/name')
  async searchName(@Body() searchNameDto: SearchNameDto) {
    return this.categoryService.searchName(searchNameDto)
  }

  @ApiResponse({
    status: 201,
    description: 'successful operation',
    type: CategoryDto,
  })
  @Post('search/type')
  async searchType(@Body() searchTypeDto : SearchTypeDto) {
    return this.categoryService.searchByType(searchTypeDto)
  }
}
