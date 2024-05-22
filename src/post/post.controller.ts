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
  UseInterceptors
} from '@nestjs/common'
import { PostService } from './post.service'
import { CreatePostDto, UpdatePostDto } from 'src/auth/dto'
import { ApiTags } from '@nestjs/swagger'
import { Post as PostDB } from '@prisma/client'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'


@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
    async createPost(@Body() createPostDto: CreatePostDto) {
      const post = await this.postService.createPost(createPostDto);
      return post; // You can return the created product as a response
    }

  // @Post('local')
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     storage: diskStorage({
  //       destination: './image',
  //       filename: (req, file, cb) => {
  //         cb(null, file.originalname);
  //       },
  //     }),
  //   }),
  // )
  // async local(@UploadedFile() file: Express.Multer.File, @Body() createPostDto: CreatePostDto) {
  //   // Tạo bài đăng với thông tin từ DTO và tên của ảnh từ file đã tải lên
  //   const post = await this.postService.createPost({
  //     ...createPostDto,
  //     image: file.filename, // Sử dụng tên của ảnh đã tải lên
  //   });
  
  //   return {
  //     statusCode: 200,
  //     data: post,
  //   };
  // }
  
  @Post('local')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './image',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async local(@UploadedFile() file: Express.Multer.File) {
    return {
      statusCode: 200,
      data: file.path,
    };
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
