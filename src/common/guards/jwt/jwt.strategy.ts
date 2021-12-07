import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_PRIVATE_KEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any): Promise<any> {
    return {
      username: payload.username,
      facebookId: payload.facebookId,
      roleId: payload.roleId,
    };
  }
}
