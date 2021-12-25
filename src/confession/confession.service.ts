import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindManyOptions, Like, Repository } from 'typeorm';
import { Confession } from './confession.entity';
import { CreateConfessionDto } from './dto';
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class ConfessionService {
  constructor(
    @InjectRepository(Confession)
    private readonly confessionRepository: Repository<Confession>,
  ) {}

  create(confession: CreateConfessionDto): Promise<Confession> {
    return this.confessionRepository.save(confession);
  }

  find(
    conditions: FindConditions<Confession>,
    options?: FindManyOptions<Confession>,
  ): Promise<Confession[]> {
    return this.confessionRepository.find({
      where: conditions,
      ...options,
    });
  }

  getAll(filter: FilterDto): Promise<Confession[]> {
    return this.confessionRepository.find({
      where: {
        context: Like(`%${filter.search}%`),
      },
      skip: (filter.page - 1) * filter.limit,
      take: filter.limit,
      relations: ['post'],
    });
  }

  async getById(id: number): Promise<Confession> {
    const confession = await this.confessionRepository.findOne(id);
    if (!confession) throw new NotFoundException('Confession not found');
    return confession;
  }
}
