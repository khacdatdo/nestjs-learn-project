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
import { ROLES } from 'src/common/constants';
import { Role } from 'src/common/guards/role/role.decorator';
import { AllValidationPipe } from 'src/common/pipes/validation.pipe';
import { IsNull, Not } from 'typeorm';
import { Confession } from './confession.entity';
import { ConfessionService } from './confession.service';
import { CreateConfessionDto } from './dto';
import { FilterDto } from './dto/filter.dto';

@Controller('confessions')
export class ConfessionController {
  constructor(private confessionService: ConfessionService) {}

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

  @Get('recently-posted')
  getRecentlyPostedConfessions(): Promise<Confession[]> {
    return this.confessionService.find(
      {
        post: Not(IsNull()),
      },
      {
        relations: ['post'],
      },
    );
  }

  @Role(ROLES.MOD)
  @Get()
  getAllConfessions(@Query() filter: FilterDto): Promise<any> {
    const defaultFilter = {
      limit: 20,
      page: 1,
      search: '',
    };
    return this.confessionService.getAll(Object.assign(defaultFilter, filter));
  }

  @Role(ROLES.MOD)
  @Get(':id')
  getConfession(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Confession> {
    return this.confessionService.getById(id);
  }
}
