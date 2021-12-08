import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UnprocessableEntityException,
  UsePipes,
} from '@nestjs/common';
import { ROLES } from 'src/common/constants';
import { Role } from 'src/common/guards/role/role.decorator';
import { AllValidationPipe } from 'src/common/pipes/validation.pipe';
import { CreateRoleDto } from './dto/create.dto';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Role(ROLES.ADMIN)
  @Post()
  @HttpCode(200)
  @UsePipes(new AllValidationPipe())
  async createRole(@Body() role: CreateRoleDto): Promise<any> {
    const isExist = await this.roleService.findByName(role.name);
    if (isExist) throw new UnprocessableEntityException('Role already exist');
    await this.roleService.create(role);
    return {
      message: 'Role created successfully',
    };
  }

  @Role(ROLES.MEMBER)
  @Get()
  getAllRole(): Promise<any> {
    return this.roleService.getAll();
  }
}
