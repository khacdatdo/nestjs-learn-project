import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setting } from './setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Setting])],
  providers: [SettingService],
  controllers: [SettingController],
})
export class SettingModule {}
