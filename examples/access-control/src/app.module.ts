import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { RolesModule } from './roles/roles.module'

@Module({
  imports: [UsersModule, RolesModule], // AccessControlModule.forAsyncRoles(roles) // 음... 안되네
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
