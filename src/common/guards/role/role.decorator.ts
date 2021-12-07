import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleGuard } from './role.guard';

export const ROLE_KEY = 'role';
export const Role = (role: number) => {
  return applyDecorators(SetMetadata(ROLE_KEY, role), UseGuards(RoleGuard));
};
