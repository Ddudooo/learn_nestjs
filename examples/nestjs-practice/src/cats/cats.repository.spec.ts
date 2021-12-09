import { newDb } from 'pg-mem'
import { Connection } from 'typeorm'
import { Cat } from './entities/cat.entity'
import { Test } from '@nestjs/testing'
import { CatsRepository } from './cats.repository'

describe('리포지토리 유닛 테스트', () => {
  let connection: Connection
  let repository: CatsRepository
  beforeEach(async () => {
    const memoryDB = newDb({
      autoCreateForeignKeyIndices: true,
    })
    memoryDB.public.registerFunction({
      implementation: () => 'test',
      name: 'current_database',
    })
    connection = await memoryDB.adapters.createTypeormConnection({
      type: 'postgres',
      entities: [Cat],
    })
    await connection.synchronize()
    await Test.createTestingModule({
      providers: [Cat],
    })
      .overrideProvider(Connection)
      .useValue(connection)
      .compile()

    repository = connection.getCustomRepository(CatsRepository)
  })

  afterEach(async () => {
    await connection.close()
  })

  it('테스트 구성 확인', async () => {
    expect(repository).toBeDefined()
  })
})
