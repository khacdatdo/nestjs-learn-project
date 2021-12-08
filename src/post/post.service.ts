import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Confession } from 'src/confession/confession.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create.dto';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Confession)
    private readonly confessionRepository: Repository<Confession>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postRepository.find({
      relations: ['user', 'confessions'],
    });
  }

  findById(id: number): Promise<Post> {
    return this.postRepository.findOne(id);
  }

  findByFBPostId(id: string | number): Promise<Post> {
    return this.postRepository.findOne({
      where: { facebookPostId: id },
      relations: ['user', 'confessions'],
    });
  }

  async create(post: CreatePostDto, user: User): Promise<Post> {
    const confessions = await this.confessionRepository.findByIds(
      post.confessions,
    );
    if (confessions.length === 0)
      throw new UnprocessableEntityException(
        'Must have at least one confession',
      );
    const newPost = new Post();
    newPost.user = user;
    newPost.confessions = confessions;
    newPost.facebookPostId = post.facebookPostId;
    return this.postRepository.save(newPost);
  }
}
