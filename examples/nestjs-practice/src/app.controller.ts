import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { AppService } from './app.service'
import { Request } from 'express'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('/test')
  getTest(@Req() req: Request): string {
    console.log(req)
    return this.constructor.name
  }

  @Post('/test')
  postTest(@Body() body) {
    console.log('바로 리퀘스트 바디 파싱', body)
    return 'post test'
  }
}
