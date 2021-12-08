import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Confession } from 'src/confession/confession.entity';
import { UserModule } from 'src/user/user.module';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Confession]), UserModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
