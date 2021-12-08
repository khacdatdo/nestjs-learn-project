import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Like, Repository } from 'typeorm';
import { Confession } from './confession.entity';
import { CreateConfessionDto } from './dto';
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class ConfessionService {
  @InjectRepository(Confession)
  private readonly confessionRepository: Repository<Confession>;

  constructor() {
    this.confessionRepository = getRepository(Confession);
  }

  create(confession: CreateConfessionDto): Promise<Confession> {
    return this.confessionRepository.save(confession);
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
