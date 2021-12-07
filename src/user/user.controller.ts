import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UpdateUserRoleDto } from './dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get('posts')
  getAllUsersWithPosts(): Promise<User[]> {
    return this.userService.getAllWithPosts();
  }

  @Get(':id')
  getUserById(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.userService.getById(id);
  }

  @Get('/:id/posts')
  getUserByIdWithPosts(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<User> {
    return this.userService.getByIdWithPosts(id);
  }

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<any> {
    await this.userService.create(user);
    return {
      message: 'User has been created',
    };
  }

  @Patch(':id')
  async updateUserById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() user: UpdateUserDto,
  ): Promise<any> {
    await this.userService.updateById(id, user);
    return {
      message: 'User information has been updated',
    };
  }

  @Patch(':id/role')
  async updateUserRole(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() role: UpdateUserRoleDto,
  ): Promise<any> {
    await this.userService.changeRole(id, role.roleId);
    return {
      message: 'User role has been updated',
    };
  }

  @Delete(':id')
  async removeUserById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<any> {
    await this.userService.removeById(id);
    return {
      message: 'User has been removed',
    };
  }
}
