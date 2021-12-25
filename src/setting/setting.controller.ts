import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ROLES } from 'src/common/constants';
import { Role } from 'src/common/guards/role/role.decorator';
import { AllValidationPipe } from 'src/common/pipes/validation.pipe';
import { CreateSettingDto } from './dto/create.dto';
import { Setting } from './setting.entity';
import { SettingService } from './setting.service';

@Controller('settings')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Role(ROLES.ADMIN)
  @Post()
  @HttpCode(200)
  @UsePipes(new AllValidationPipe())
  async create(@Body() setting: CreateSettingDto): Promise<any> {
    await this.settingService.create(setting);
    return {
      message: 'Setting created successfully',
    };
  }

  @Role(ROLES.MOD)
  @Get()
  getAll(): Promise<Setting[]> {
    return this.settingService.findAll();
  }
}
