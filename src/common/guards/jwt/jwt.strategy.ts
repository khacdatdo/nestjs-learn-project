import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { FindOneOptions } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userSevice: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any): Promise<any> {
    const options: FindOneOptions<User> = {
      where: payload,
      relations: ['roles'],
    };
    const user = await this.userSevice.findOne(options);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    payload.roleId = user.role.id;
    return user;
  }
}
