import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
  ) {}

  async login(username: string, facebookId: string): Promise<string> {
    const user = await this.userRepository.findOne({
      username,
      facebookId,
    });
    if (!user) throw new NotFoundException('Invalid credentials');
    const payload = {
      username: user.username,
      facebookId: user.facebookId,
      roleId: user.role.id,
    };
    return this.jwtService.sign(payload);
  }

  async register(user: CreateUserDto): Promise<User> {
    const isExist = await this.userRepository.findOne({
      username: user.username,
    });
    if (isExist) throw new NotFoundException('User already exist');
    return this.userService.create(user);
  }
}
