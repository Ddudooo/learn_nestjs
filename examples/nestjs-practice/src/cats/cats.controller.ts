import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { CatsService } from './cats.service'
import { CreateCatDto } from './dto/create-cat.dto'
import { UpdateCatDto } from './dto/update-cat.dto'

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto)
  }

  @Get()
  async findAll() {
    return this.catsService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.catsService.findOne(+id)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.catsService.remove(+id)
  }
}
