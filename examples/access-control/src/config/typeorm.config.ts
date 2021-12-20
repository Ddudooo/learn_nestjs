import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

const TypeOrmConfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  namingStrategy: new SnakeNamingStrategy(),
  entities: ['src/**/*.entity{.ts,.js}'],
  migrationsTableName: 'migration',
  migrations: ['src/db/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
  logging: 'all',
  synchronize: true,
}

export default TypeOrmConfig
