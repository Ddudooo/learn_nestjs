import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { setNestMiddlewares } from './config/defaultNestapp'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  setNestMiddlewares(app)
  await app.listen(3000)
}

bootstrap()
