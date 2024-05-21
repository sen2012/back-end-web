import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { Post } from '@prisma/client'
import { CreatePostDto, UpdatePostDto } from '../auth/dto'
import { PrismaService } from 'src/prisma.service'
import * as fs from 'fs-extra'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
  
@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  async createPost(createPostDto: CreatePostDto) {

    // Lưu thông tin bài đăng vào cơ sở dữ liệu với tên ảnh
    const post = await this.prismaService.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        published: createPostDto.published,
        image: createPostDto.image, // Lưu tên của ảnh vào cơ sở dữ liệu
      },
    });

    return post;
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.prismaService.post.findUnique({
      where: { id },
    })
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`)
    }
    return this.prismaService.post.update({
      where: { id },
      data: updatePostDto,
    })
  }

  async getPost(): Promise<Post[]> {
    return await this.prismaService.post.findMany()
  }

  async getPostById(id: number): Promise<Post> {
    const post = await this.prismaService.post.findUnique({
      where: { id },
    })
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`)
    }
    return post
  }

  async deletePost(id: number) {
    const post = await this.prismaService.post.findUnique({
      where: { id },
    })
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`)
    }
    return this.prismaService.post.delete({ where: { id } })
  }
  async searchTitle(title: string) {
    return this.prismaService.post.findMany({
      where: {
        title: {
          contains: title,
        },
      },
    })
  }
}
