import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  createToken(user: User): string {
    const payload = {
      username: user.username,
      facebookId: user.facebookId,
      roleId: user.role.id,
    };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
    });
  }

  createRefreshToken(user: User): string {
    const payload = {
      username: user.username,
      facebookId: user.facebookId,
    };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
    });
  }

  async login(username: string, facebookId: string): Promise<any> {
    const user = await this.userService.findOne({
      where: {
        username,
        facebookId,
      },
      relations: ['role'],
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return {
      accessToken: this.createToken(user),
      refreshToken: this.createRefreshToken(user),
    };
  }

  async refreshToken(payload: any): Promise<any> {
    const { username, facebookId } = payload;
    const user = await this.userService.findOne({
      where: {
        username,
        facebookId,
      },
      relations: ['role'],
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return {
      accessToken: this.createToken(user),
      refreshToken: this.createRefreshToken(user),
    };
  }
}
