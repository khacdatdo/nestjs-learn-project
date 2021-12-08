import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DEFAULT_ROLE } from 'src/common/constants';
import { Role } from 'src/role/role.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const isExist = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });
    if (isExist)
      throw new UnprocessableEntityException('Username already exist');
    const newUser = new User();
    newUser.role = await this.roleRepository.findOne(DEFAULT_ROLE);
    this.userRepository.merge(newUser, user);
    return this.userRepository.save(newUser);
  }

  findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  getAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['role'],
    });
  }

  getAllWithPosts(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['role', 'posts'],
    });
  }

  async getById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id, {
      relations: ['role'],
    });
    if (!user) throw new NotFoundException('User does not exist');
    return user;
  }

  async getByIdWithPosts(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id, {
      relations: ['role', 'posts'],
    });
    if (!user) throw new NotFoundException('User does not exist');
    return user;
  }

  async updateById(id: number, user: UpdateUserDto): Promise<User> {
    const userToUpdate = await this.userRepository.findOne(id);
    if (!userToUpdate) throw new NotFoundException('User does not exist');
    this.userRepository.merge(userToUpdate, user);
    return this.userRepository.save(userToUpdate);
  }

  async changeRole(id: number, roleId: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('User does not exist');
    const role = await this.roleRepository.findOne(roleId);
    if (!role) throw new NotFoundException('Role does not exist');
    user.role = role;
    return this.userRepository.save(user);
  }

  async removeById(id: number): Promise<User> {
    const userToRemove = await this.userRepository.findOne(id);
    if (!userToRemove) throw new NotFoundException('User does not exist');
    return this.userRepository.remove(userToRemove);
  }
}
