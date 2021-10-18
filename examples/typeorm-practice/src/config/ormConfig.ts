import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { ConnectionOptions } from 'typeorm'


export const ormConfig:ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'test12',
  database: 'local',
  entities: [
    'src/**/*.entity{.ts,.js}'
  ],
  migrationsTableName: 'migration',
  migrations: [
    'src/db/migrations/*.ts'
  ],
  cli: {
    'migrationsDir': 'src/db/migrations'
  },
  logging: true,
  namingStrategy: new SnakeNamingStrategy()
}