import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { PostService } from './post.service'
import { CreatePostDto, UpdatePostDto } from 'src/auth/dto'
import { ApiTags } from '@nestjs/swagger'
import { Post as PostDB } from '@prisma/client'
import { title } from 'process'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image')) // Tên trường của tệp trong multipart form-data
  async createPost(@Body() createPostDto: CreatePostDto) {
    const post = await this.postService.createPost(createPostDto);
    return post;
  }

  @Put(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostDB> {
    const updatedPost = await this.postService.updatePost(
      parseInt(id, 10),
      updatePostDto,
    )
    if (!updatedPost) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }
    return updatedPost
  }

  @Get()
  async getPost(): Promise<PostDB[]> {
    return await this.postService.getPost()
  }

  @Get('get/:id')
  async getPostById(@Param('id') id: string): Promise<PostDB> {
    const post = await this.postService.getPostById(parseInt(id, 10))
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`)
    }
    return post
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    const deletedCategory = await this.postService.deletePost(parseInt(id, 10))
    if (!deletedCategory) {
      throw new NotFoundException(`Post with ID ${id} not found`)
    }
    return { message: `Post with ID ${id} has been deleted` }
  }

  @Get('search/:title')
  async searchTitle(@Param('title') title: string) {
    return this.postService.searchTitle(title)
  }
}
