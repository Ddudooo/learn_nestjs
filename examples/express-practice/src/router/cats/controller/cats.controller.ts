import { Router } from 'express'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import logger from '@/config/logger.winston'
import Cat from '@/router/cat.model'
import CatService from '@/router/cats/service/cat.service'

export default class CatController {
  private readonly catService: CatService

  private readonly router: Router

  constructor(catService: CatService) {
    this.catService = catService
    this.router = Router()

    this.router.get('', (req, res) => {
      try {
        res.status(200).send({
          statusCode: 200,
          message: {
            cats: catService.getAll().map(cat => instanceToPlain(cat)),
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

    this.router.get('/:id', (req, res) => {
      try {
        const foundCat = this.catService.getById(parseInt(req.params.id, 10))
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

    this.router.post('', (req, res) => {
      try {
        const { body } = req
        const cat: Cat = plainToInstance(Cat, body as Cat)
        const savedCat = this.catService.create(cat)
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

    this.router.patch('/:id', (req, res) => {
      try {
        const update = {
          // @ts-ignore
          id: req.params.id,
          ...(req.body as Cat),
        }
        const updated = this.catService.update(plainToInstance(Cat, update))
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

    this.router.delete('/:id', (req, res) => {
      try {
        const isDeleted = this.catService.remove(parseInt(req.params.id, 10))
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
  }

  public getRouter() {
    return this.router
  }
}
