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

    it(
      '리소스들이 정상적으로 조회되야 한다.',
      runInTransaction(async () => {
        // given
        const catRepo = connection.getCustomRepository(CatsRepository)
        for (let i = 0; i < 10; i++) {
          const createCat = plainToInstance(Cat, {
            name: 'TEST_CAT_' + i,
            age: 10,
            species: 'TEST',
          })
          await catRepo.save(createCat)
        }
        // when
        const foundCat = await request(app.getHttpServer()).get(`/cats`)

        // then
        expect(foundCat.statusCode).toEqual(HttpStatus.OK)
        expect(foundCat.body).toBe(expect.any(Array))
      }),
    )
  })

  describe('Cat 생성 E2E 테스트', () => {
    it(
      '생성 요청이 정상적으로 처리되어야 한다.',
      runInTransaction(async () => {
        // given
        const createDto = {
          age: 3,
          name: 'TEST_CAT',
          species: 'TEST',
        }

        // when
        const response = await request(app.getHttpServer())
          .post('/cats')
          .send(createDto)

        // then
        expect(response.statusCode).toEqual(HttpStatus.CREATED)
        expect(response.body.name).toEqual(createDto.name)
        expect(response.body.age).toEqual(createDto.age)
        expect(response.body.species).toEqual(createDto.species)
      }),
    )
  })

  describe('Cat 변경 E2E 테스트', () => {
    it(
      '변경 요청이 정상적으로 처리되어야 한다.',
      runInTransaction(async () => {
        // given
        const catRepo = connection.getCustomRepository(CatsRepository)
        const createCat = plainToInstance(Cat, {
          name: 'TEST_CAT',
          age: 10,
          species: 'TEST',
        })
        const createdCat = await catRepo.save(createCat, { reload: true })
        const updateDto = {
          age: 3,
          name: 'UPDATE_CAT',
          species: 'UPDATE',
        }

        // when
        const response = await request(app.getHttpServer())
          .post(`/cats/${createdCat.id}`)
          .send(updateDto)

        // then
        expect(response.statusCode).toEqual(HttpStatus.CREATED)
        expect(response.body.name).toEqual(updateDto.name)
        expect(response.body.age).toEqual(updateDto.age)
        expect(response.body.species).toEqual(updateDto.species)
      }),
    )
  })

  describe('Cat 삭제 E2E 테스트', () => {
    it(
      '삭제 요청이 정상적으로 처리되어야 한다.',
      runInTransaction(async () => {
        // given
        const catRepo = connection.getCustomRepository(CatsRepository)
        const createCat = plainToInstance(Cat, {
          name: 'TEST_CAT',
          age: 10,
          species: 'TEST',
        })
        const createdCat = await catRepo.save(createCat, { reload: true })

        // when
        const response = await request(app.getHttpServer()).delete(
          `/cats/${createdCat.id}`,
        )

        // then
        expect(response.statusCode).toEqual(HttpStatus.NO_CONTENT)
      }),
    )
  })
})
