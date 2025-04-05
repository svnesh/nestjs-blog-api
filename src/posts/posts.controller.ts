import { Body, Controller, Delete, Get, Logger, Param, Post, Request, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/create.post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/common/get-user.decorator';
import { CaptionValidationPipe } from './caption-validation.pipe';

@Controller('posts')
export class PostsController {
  private readonly logger = new Logger(PostsController.name);

  constructor(
    private postService: PostsService,
  ){}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createPost (
    @UploadedFile() file: Express.Multer.File,
    @Body(new CaptionValidationPipe()) createPostDto: CreatePostDto,
    @GetUser() reqUser
  ){
    return this.postService.createPost(createPostDto, reqUser, file);
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
