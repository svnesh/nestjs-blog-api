import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    AuthModule,
  ],
  providers: [PostsService, CloudinaryService],
  controllers: [PostsController],
  exports: [CloudinaryService]
})
export class PostsModule {}
