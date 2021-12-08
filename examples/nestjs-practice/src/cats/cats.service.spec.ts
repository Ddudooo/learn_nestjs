import { Test, TestingModule } from '@nestjs/testing'
import { CatsService } from './cats.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { CatsRepository } from './cats.repository'
import { plainToInstance } from 'class-transformer'
import { Cat } from './entities/cat.entity'
import { randomInt } from 'crypto'
import { CreateCatDto } from './dto/create-cat.dto'
import { UpdateCatDto } from './dto/update-cat.dto'

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

  it('id값이 맞는 엔티티 하나가 조회되어야 한다.', async () => {
    // given
    const savedCats = []
    for (let i = 0; i < 10; i++) {
      const mockCat = plainToInstance(Cat, {
        id: i,
        name: 'mock',
        age: randomInt(1, 10),
        species: 'mockCat',
      })
      savedCats.push(mockCat)
    }
    const requestId = randomInt(0, 10)
    const foundCat = savedCats.find((entity) => entity.id === requestId)
    mockRepo.findOne = jest.fn().mockResolvedValue(foundCat)

    // when
    const response = await service.findOne(requestId)

    // then
    expect(response).toBeDefined()
    expect(response).toEqual(foundCat)
  })

  it('생성시 정상적으로 추가되어야 한다.', async () => {
    // given
    const requestBody = {
      id: randomInt(9999),
      name: 'TEST',
      age: randomInt(1, 10),
      species: 'TEST',
    }
    const requestDto = plainToInstance(CreateCatDto, requestBody)
    const mockCreatedCat = plainToInstance(Cat, { ...requestDto })
    mockRepo.save = jest.fn().mockResolvedValue(mockCreatedCat)

    // when
    const response = await service.create(requestDto)
    // then
    expect(response).toBeDefined()
    expect(response).toEqual(mockCreatedCat)
  })

  it('변경 요청 대상이 변경되야 한다.', async () => {
    // given
    const requestId = randomInt(0, 10)
    const updateDto = plainToInstance(UpdateCatDto, {
      name: 'TEST',
      age: randomInt(1, 10),
      species: 'TEST',
    })
    mockRepo.findOneOrFail = jest.fn().mockResolvedValue(
      plainToInstance(Cat, {
        id: requestId,
        name: 'mock',
        age: 0,
        species: 'mockCat',
      }),
    )
    mockRepo.save = jest.fn().mockResolvedValue(
      plainToInstance(Cat, {
        ...updateDto,
        id: requestId,
      }),
    )

    // when
    const response = await service.update(requestId, updateDto)

    // then
    expect(response).toBeDefined()
    expect(response).toMatchObject({ ...updateDto, id: requestId })
  })
})
