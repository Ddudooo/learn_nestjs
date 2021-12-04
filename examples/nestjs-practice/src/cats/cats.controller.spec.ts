import { Test, TestingModule } from '@nestjs/testing'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'
import { plainToInstance } from 'class-transformer'
import { Cat } from './entities/cat.entity'

describe('Cat 컨트롤러 유닛 테스트', () => {
  let controller: CatsController
  let mockService: CatsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
    })
      .useMocker((token) => {
        if (token === CatsService) {
          return {}
        }
      })
      .compile()

    controller = module.get<CatsController>(CatsController)
    mockService = module.get<CatsService>(CatsService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('생성 요청 테스트', async () => {
    // given
    const creatDto = {
      name: 'testCat',
      age: 10,
      species: 'TEST',
    }
    mockService.create = jest.fn().mockReturnValue(creatDto)

    // when
    const result = await controller.create(creatDto)

    // then
    expect(result).toMatchObject(creatDto)
  })

  it('단일 조회 요청 테스트', async () => {
    // given
    mockService.findOne = jest
      .fn()
      .mockReturnValue(
        plainToInstance(Cat, { name: 'test', age: 10, species: 'TEST' }),
      )
    // when
    const result = await controller.findOne('1')
    // then
    expect(result).toBeInstanceOf(Cat)
  })
})
