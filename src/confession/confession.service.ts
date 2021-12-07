import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { Confession } from './confession.entity';
import { CreateConfessionDto } from './dto';

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

  getAll(): Promise<Confession[]> {
    return this.confessionRepository.find();
  }

  async getById(id: number): Promise<Confession> {
    const confession = await this.confessionRepository.findOne(id);
    if (!confession) throw new NotFoundException('Confession not found');
    return confession;
  }
}
