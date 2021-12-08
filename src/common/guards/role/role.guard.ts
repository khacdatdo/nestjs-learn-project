import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from './role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireRole = this.reflector.getAllAndOverride<number>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requireRole) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user && user.roleId <= requireRole) {
      return true;
    } else {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }
  }
}
