import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSettingDto } from './dto/create.dto';
import { Setting } from './setting.entity';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {}

  async create(setting: CreateSettingDto): Promise<Setting> {
    const isExist = await this.findByKey(setting.key);
    if (isExist)
      throw new UnprocessableEntityException('Setting key already exist');
    return this.settingRepository.save(setting);
  }

  findAll(): Promise<Setting[]> {
    return this.settingRepository.find();
  }

  findByKey(key: string): Promise<Setting> {
    return this.settingRepository.findOne({
      key,
    });
  }
}
