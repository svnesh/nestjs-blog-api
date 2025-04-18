import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreatePostDto } from './dto/create.post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class PostsService {

  private readonly logger = new Logger(PostsService.name);

  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private readonly cloudinaryService: CloudinaryService, 
  ) {}

  async createPost(createPostDto: CreatePostDto, reqUser, file: Express.Multer.File): Promise<Post> {
    try{
      let imgUrl = null;
      if (file){
        imgUrl = await this.cloudinaryService.uploadImage(file);
      }
      const newPost = await this.postRepository.create({
        ...createPostDto, 
        imageURL: imgUrl, 
        userID: reqUser.userId
      });
      return this.postRepository.save(newPost);
    } catch(error) {
      this.logger.error(error)
    }
  }

  async getAllPosts(): Promise<Post[]> {
    return this.postRepository.find({ 
      relations: ['userID'],
      select: {
        userID: { id: true, name: true, email: true }
      } 
    })
  }

  async getPostById(id: number): Promise<Post> {
    return this.postRepository.findOne({ 
      where: { id: id}, 
      relations: ['userID'],
      select: {
        userID: { id: true, name: true, email: true }
      }
    });
  }

  async deletePost(id: number, userId: number): Promise<void> {
    const post = await this.getPostById(id);
    if ((post.userID as User)?.id !== userId){ throw new Error('Not a valid action.') }
    await this.postRepository.delete(id);
  }

}
