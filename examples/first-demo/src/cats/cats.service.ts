import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { FindOption } from './dto/request/findOption.dto';
import { Cat, Cat as CatEntity } from './entity/cat.entity';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(CatEntity)
    private catRepository: Repository<CatEntity>,
    private connection: Connection,
  ) {}

  async create(cat: Cat): Promise<void> {
    // this.cats.push(cat);
    await this.connection.transaction(async (manager) => {
      // 맵핑 유틸 클래스나 함수로 빼야...
      let entity: CatEntity = new CatEntity();
      entity.age = cat.age;
      entity.name = cat.name;
      entity.breed = cat.breed;
      await manager.save(entity);
    });
  }

  async findAll(option: FindOption): Promise<Cat[]> {
    return await this.connection.transaction(async (manager) => {
      return await manager
        .createQueryBuilder()
        .select('cat')
        .from(Cat, 'cat')
        .offset(option.offset)
        .limit(option.offset + option.pageSize)
        .getMany();
      //.orderby
    });
  }
}
