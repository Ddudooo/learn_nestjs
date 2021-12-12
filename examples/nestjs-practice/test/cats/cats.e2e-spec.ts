import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../../src/app.module'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { setNestMiddlewares } from '../../src/config/defaultNestapp'
import {
  initialiseTestTransactions,
  runInTransaction,
} from 'typeorm-test-transactions'
import { Connection } from 'typeorm'
import { CatsRepository } from '../../src/cats/cats.repository'
import { Cat } from '../../src/cats/entities/cat.entity'
import { plainToInstance } from 'class-transformer'
import * as request from 'supertest'

initialiseTestTransactions()

describe('Cat API E2E 테스트', () => {
  let app: INestApplication
  let connection: Connection
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()

    setNestMiddlewares(app)
    await app.init()

    connection = app.get(Connection)
  })

  afterAll(async () => {
    await app.close()
  })

  describe('조회 테스트', () => {
    it(
      '단일 리소스가 정상적으로 조회되야 한다.',
      runInTransaction(async () => {
        // given
        const catRepo = connection.getCustomRepository(CatsRepository)
        const createCat = plainToInstance(Cat, {
          name: 'TEST_CAT',
          age: 10,
          species: 'TEST',
        })
        const createdCat = await catRepo.save(createCat)
        // when
        const foundCat = await request(app.getHttpServer()).get(
          `/cats/${createCat.id}`,
        )

        // then
        expect(foundCat.statusCode).toEqual(HttpStatus.OK)
        expect(foundCat.body).toMatchObject(createdCat)
      }),
    )
  })
})
