import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UnprocessableEntityException,
  UsePipes,
} from '@nestjs/common';
import { ROLES } from 'src/common/constants';
import { Role } from 'src/common/guards/role/role.decorator';
import { AllValidationPipe } from 'src/common/pipes/validation.pipe';
import { UserService } from 'src/user/user.service';
import { CreatePostDto } from './dto/create.dto';
import { Post as P } from './post.entity';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  @Role(ROLES.ADMIN)
  @Get()
  getAll(): Promise<P[]> {
    return this.postService.findAll();
  }

  @Role(ROLES.MOD)
  @Post()
  @HttpCode(200)
  @UsePipes(new AllValidationPipe())
  async create(@Body() post: CreatePostDto, @Req() req: any): Promise<any> {
    const user = await this.userService.findByUsername(req.user.username);
    if (!user) throw new UnprocessableEntityException('User not found');
    const isExistPost = await this.postService.findByFBPostId(
      post.facebookPostId,
    );
    if (isExistPost)
      throw new UnprocessableEntityException('Post already exist');
    await this.postService.create(post, user);
    return {
      message: 'Post created',
    };
  }
}
