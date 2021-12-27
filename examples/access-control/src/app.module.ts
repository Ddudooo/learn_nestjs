import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { RolesModule } from './roles/roles.module'
import { AccessControlModule, RolesBuilder } from 'nest-access-control'
import { RolesService } from './roles/roles.service'

@Module({
  imports: [
    UsersModule,
    RolesModule,
    AccessControlModule.forRootAsync({
      imports: [RolesModule],
      inject: [RolesService],
      useFactory: async (roleService: RolesService): Promise<RolesBuilder> => {
        return new RolesBuilder(await roleService.getRoles())
      },
    }),
  ], // AccessControlModule.forAsyncRoles(roles) // 음... 안되네
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
