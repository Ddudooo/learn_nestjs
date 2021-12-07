import { Test, TestingModule } from '@nestjs/testing'
import { CatsService } from './cats.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { CatsRepository } from './cats.repository'
import { plainToInstance } from 'class-transformer'
import { Cat } from './entities/cat.entity'
import { randomInt } from 'crypto'

describe('CatsService', () => {
  let service: CatsService
  let mockRepo: CatsRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        { provide: getRepositoryToken(CatsRepository), useValue: {} },
      ],
    }).compile()

    service = module.get<CatsService>(CatsService)
    mockRepo = module.get(CatsRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('모두 조회하면 저장된 값이 모두 찾아와야 한다.', async () => {
    // given
    const savedCats = []
    for (let i = 0; i < 10; i++) {
      const mockCat = plainToInstance(Cat, {
        name: 'mock',
        age: randomInt(1, 10),
        species: 'mockCat',
      })
      savedCats.push(mockCat)
    }
    mockRepo.find = jest.fn().mockResolvedValue(savedCats)
    // when
    const response = await service.findAll()
    // then
    expect(response.length).toEqual(savedCats.length)
    // ?? jest matcher 너무 구림.
    expect(response).toEqual(expect.arrayContaining(savedCats))
  })
})
