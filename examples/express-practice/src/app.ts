import 'module-alias/register'
import express, { RequestHandler } from 'express'
import { RequestAssignId, RequestLogging } from '@/middleware/requestLogging.middleware'
import logger from '@/config/logger.winston'
import CatController from '@/router/cats/controller/cats.controller'
import 'reflect-metadata'
import Server from '@/server'
import CatRepository from '@/router/cats/repository/cats.repository'
import CatService from '@/router/cats/service/cat.service'

logger.info('Express Server started...')

const server = new Server(3000, logger)
server.setMiddleware(express.json())
server.setMiddleware(RequestAssignId)
server.setMiddleware(RequestLogging)

const catRepo = new CatRepository()
const catService = new CatService(catRepo)
const catController = new CatController(catService)

server.setRouter(catController.getRouter(), '/cats')
const NotFoundRouter: RequestHandler = (req, res) => {
  logger.warn('PAGE NOT FOUND')
  res.status(404)
  res.json({ statusCode: 404, message: 'Page Not Found', detail: `${req.url} not found. please check URL` })
}
server.setMiddleware(NotFoundRouter)
server.start()
