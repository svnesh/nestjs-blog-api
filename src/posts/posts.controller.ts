import { Body, Controller, Delete, Get, Logger, Param, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/create.post.dto';

@Controller('posts')
export class PostsController {
  private readonly logger = new Logger(PostsController.name);

  constructor(
    private postService: PostsService,
  ){}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createPost (
    @UploadedFile() file: Express.Multer.File,
    @Body() createPostDto: CreatePostDto,
    @Request() req,
  ){
    this.logger.log(req);
    return this.postService.createPost(createPostDto, req.user, file);
  }

  @Get()
  async getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  async getOnePost(@Param('id') id: number) {
    return this.postService.getPostById(id);
  }

  @Delete(':id')
  async deletePost(
    @Param('id') id: number,
    @Request() req,
  ) {
    return this.postService.deletePost(id, req.user.id);
  }
}
