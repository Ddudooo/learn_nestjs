import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
  HttpCode,
  Header,
  Redirect,
  Query,
  Param,
  Body,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';

import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { CreateCatForm, UpdateCatForm } from './dto/index.dto';
import { ValidationPipe } from 'src/pipes/ValidationPipe.pipe';
import { ReqFindOption } from './pipes/reqFindOption.pipe';
import { FindOption } from './dto/request/findOption.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get('/docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Get()
  @UsePipes(new ReqFindOption())
  async findAll(@Query() option: FindOption): Promise<Cat[]> {
    // TODO: 모든 고양이 반환
    console.log(option);
    return this.catsService.findAll(option);
  }

  @Get(':id')
  findOne(@Param('id') params): string {
    console.log(params);
    return `이 메소드는 ID값에 따른 리소스 하나를 반환한다. ${params.id}`;
  }

  @Post()
  // @HttpCode(204) - HTTP 상태 코드를 데코레이터를 통해 편하게 설정할 수 있다.
  // @Header('Cache-Control', 'none') - HTTP 응답 헤더 값을 데코레이터를 통해 설정
  async create(@Body(new ValidationPipe()) createCatForm: CreateCatForm) {
    // TODO: 리소스 생성
    this.catsService.create(createCatForm);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCatForm: UpdateCatForm,
  ): Promise<string> {
    // TODO: 리소스 변경
    console.log(updateCatForm);
    return `${id} 고양이 정보 변경`;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    // TODO: 리소스 제거
    return `${id} 고양이 제거`;
  }
}
