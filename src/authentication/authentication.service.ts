import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createToken(payload: any): string {
    return this.jwtService.sign(payload);
  }

  createRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      expiresIn: '7d',
    });
  }

  async login(username: string, facebookId: string): Promise<any> {
    const user = await this.userRepository.findOne(
      {
        username,
        facebookId,
      },
      {
        relations: ['role'],
      },
    );
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      username: user.username,
      facebookId: user.facebookId,
      roleId: user.role.id,
    };
    return {
      accessToken: this.createToken(payload),
      refreshToken: this.createRefreshToken(payload),
    };
  }

  async refreshToken(payload: any): Promise<any> {
    const { username, facebookId } = payload;
    const user = await this.userRepository.findOne({
      username,
      facebookId,
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const newPayload = {
      username: user.username,
      facebookId: user.facebookId,
      roleId: user.role.id,
    };
    return {
      accessToken: this.createToken(newPayload),
      refreshToken: this.createRefreshToken(newPayload),
    };
  }
}
