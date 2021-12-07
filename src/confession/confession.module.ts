import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfessionController } from './confession.controller';
import { Confession } from './confession.entity';
import { ConfessionService } from './confession.service';

@Module({
  imports: [TypeOrmModule.forFeature([Confession])],
  controllers: [ConfessionController],
  providers: [ConfessionService],
  exports: [ConfessionService],
})
export class ConfessionModule {}
