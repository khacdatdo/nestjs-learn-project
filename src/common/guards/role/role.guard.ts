import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
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
    console.log(requireRole);
    if (!requireRole) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return user && user.roleId <= requireRole;
  }
}
