import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Confession } from './confession.entity';
import { ConfessionService } from './confession.service';
import { CreateConfessionDto } from './dto';

@Controller('confessions')
export class ConfessionController {
  private readonly confessionService: ConfessionService;

  constructor() {
    this.confessionService = new ConfessionService();
  }

  @Post()
  async createConfession(
    @Body() confession: CreateConfessionDto,
  ): Promise<any> {
    await this.confessionService.create(confession);
    return {
      message: 'Confession created successfully',
    };
  }

  // add some filter for searching
  @Get()
  getAllConfessions(): Promise<any> {
    return this.confessionService.getAll();
  }

  @Get(':id')
  getConfession(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Confession> {
    return this.confessionService.getById(id);
  }
}
