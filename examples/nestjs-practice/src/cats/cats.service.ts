import { Injectable } from '@nestjs/common'
import { CreateCatDto } from './dto/create-cat.dto'
import { UpdateCatDto } from './dto/update-cat.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { CatsRepository } from './cats.repository'

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(CatsRepository)
    private readonly catsRepo: CatsRepository,
  ) {}

  async create(createCatDto: CreateCatDto) {
    return this.catsRepo.save(createCatDto)
  }

  async findAll() {
    return this.catsRepo.find()
  }

  async findOne(id: number) {
    return this.catsRepo.findOne(id)
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const foundCat = await this.catsRepo.findOneOrFail(id)
    return this.catsRepo.save({ ...foundCat, ...updateCatDto })
  }

  async remove(id: number) {
    return this.catsRepo.softDelete(id)
  }
}
