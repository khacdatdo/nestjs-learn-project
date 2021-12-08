import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { AllValidationPipe } from 'src/common/pipes/validation.pipe';
import { Confession } from './confession.entity';
import { ConfessionService } from './confession.service';
import { CreateConfessionDto } from './dto';
import { FilterDto } from './dto/filter.dto';

@Controller('confessions')
export class ConfessionController {
  private readonly confessionService: ConfessionService;

  constructor() {
    this.confessionService = new ConfessionService();
  }

  @Post()
  @UsePipes(new AllValidationPipe())
  async createConfession(
    @Body() confession: CreateConfessionDto,
  ): Promise<any> {
    await this.confessionService.create(confession);
    return {
      message: 'Confession created successfully',
    };
  }

  @Get()
  getAllConfessions(@Query() filter: FilterDto): Promise<any> {
    return this.confessionService.getAll(filter);
  }

  @Get(':id')
  getConfession(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Confession> {
    return this.confessionService.getById(id);
  }
}
