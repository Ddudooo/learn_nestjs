import { Router } from 'express'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import logger from '@/config/logger.winston'
import { catRepo } from '@/router/cats/repository/cats.repository'
import Cat from '@/router/cat.model'

const CatsRouter = Router()

CatsRouter.get('', (req, res) => {
  try {
    res.status(200).send({
      statusCode: 200,
      message: {
        cats: catRepo.findAll().map(cat => instanceToPlain(cat)),
      },
    })
  } catch (err) {
    logger.error(err)
    res.status(400).send({
      statusCode: 400,
      message: `고양이 목록을 불러올 수 없습니다.`,
      detail: `요청 값을 확인해주세요. - ${req.query}`,
    })
  }
})

CatsRouter.get('/:id', (req, res) => {
  try {
    const foundCat = catRepo.findById(parseInt(req.params.id, 10))
    if (!foundCat) {
      throw new Error(`Not found cat by id[${req.params.id}]`)
    }
    res.status(200).send({
      statusCode: 200,
      message: {
        cat: instanceToPlain(foundCat),
      },
    })
  } catch (err) {
    logger.error(err)
    res.status(400).send({
      statusCode: 400,
      message: '찾으려는 고양이 ID를 확인해주세요',
      detail: `요청값을 확인해주세요. - ${req.params.id}`,
    })
  }
})

CatsRouter.post('', (req, res) => {
  try {
    const { body } = req
    const cat: Cat = plainToInstance(Cat, body as Cat)
    const savedCat = catRepo.save(cat)
    res.status(201).send({
      statusCode: 201,
      message: { created: instanceToPlain(savedCat) },
    })
  } catch (err) {
    logger.error(err)
    res.status(400).send({
      statusCode: 400,
      message: '고양이 추가에 실패하였습니다.',
      detail: `요청값을 확인해주세요. - ${JSON.stringify(req.body)}`,
    })
  }
})

CatsRouter.patch('/:id', (req, res) => {
  try {
    const update = {
      // @ts-ignore
      id: req.params.id,
      ...(req.body as Cat),
    }
    const updated = catRepo.save(plainToInstance(Cat, update))
    res.status(200).send({
      statusCode: 200,
      message: {
        cat: updated,
      },
    })
  } catch (err) {
    logger.error(err)
    res.status(400).send({
      statusCode: 400,
      message: '고양이 정보 수정에 실패했습니다.',
      detail: `요청값을 확인해주세요. - ${JSON.stringify(req.body)}`,
    })
  }
})

CatsRouter.delete('/:id', (req, res) => {
  try {
    const isDeleted = catRepo.removeById(req.params.id)
    if (isDeleted) {
      res.status(204).send()
    } else {
      throw new Error('deleted fail')
    }
  } catch (err) {
    logger.error(err)
    res.status(400).send({
      statusCode: 400,
      message: '고양이 정보 제거에 실패했습니다.',
      detail: `요청값을 확인해주세요. - ${JSON.stringify(req.params.id)}`,
    })
  }
})

export default CatsRouter
