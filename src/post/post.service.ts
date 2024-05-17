import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from '@prisma/client';
import { CreatePostDto, UpdatePostDto } from '../auth/dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostService {
    constructor( private prismaService: PrismaService){}

    async createPost(createPostDto : CreatePostDto){
        const post = await this.prismaService.post.create({
            data: createPostDto
        });
        return post
    }

    async updatePost(
        id: number,
        updatePostDto: UpdatePostDto,
        ): Promise<Post> {
        const post = await this.prismaService.post.findUnique({
          where: { id },
        });
        if (!post) {
          throw new NotFoundException(`Post with ID ${id} not found`);
        }
        return this.prismaService.post.update({
          where: { id },
          data: updatePostDto,
        });
    }

    async getPost(): Promise<Post[]> {
      return await this.prismaService.post.findMany();
    }
    
    async getPostById(id: number): Promise<Post> {
      const post = await this.prismaService.post.findUnique({
        where: { id },
      });
      if (!post) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      return post;
    }

    async deletePost(id: number) {
      const post = await this.prismaService.post.findUnique({
        where: { id },
      });
      if (!post) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      return this.prismaService.post.delete({ where: { id } });
    }
    async searchTitle(title: string){
      return this.prismaService.post.findMany({
        where: {
          title: {
            contains: title
          }
        }
      })
    }
}