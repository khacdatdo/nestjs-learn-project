import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create.dto';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  create(role: CreateRoleDto): Promise<Role> {
    return this.roleRepository.save(role);
  }

  getAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  findByName(name: string): Promise<Role> {
    return this.roleRepository.findOne({ name });
  }
}
