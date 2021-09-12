import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';


@Module({
    imports: [],
    controllers: [CatsController],
})
export class CatsModule {}