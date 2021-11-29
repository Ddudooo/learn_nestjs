import 'module-alias/register'
import express, { RequestHandler } from 'express'
import { RequestAssignId, RequestLogging } from '@/middleware/requestLogging.middleware'
import logger from '@/config/logger.winston'
import CatsRouter from '@/router/cats/router/cats.router'
import 'reflect-metadata'
import Server from '@/server'

logger.info('Express Server started...')

const server = new Server(3000, logger)
server.setMiddleware(express.json())
server.setMiddleware(RequestAssignId)
server.setMiddleware(RequestLogging)
server.setRouter(CatsRouter, '/cats')
const NotFoundRouter: RequestHandler = (req, res) => {
  logger.warn('PAGE NOT FOUND')
  res.status(404)
  res.json({ statusCode: 404, message: 'Page Not Found', detail: `${req.url} not found. please check URL` })
}
server.setMiddleware(NotFoundRouter)
server.start()
//
// app.use(express.json())
// app.use(RequestAssignId)
// app.use(RequestLogging)
//
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World!')
// })
//
// app.use('/cats', CatsRouter)
//
// const NotFoundRouter: RequestHandler = (req, res) => {
//   logger.warn('PAGE NOT FOUND')
//   res.status(404)
//   res.json({ statusCode: 404, message: 'Page Not Found', detail: `${req.url} not found. please check URL` })
// }
//
// app.use(NotFoundRouter())
//
// app.listen(PORT, () => {
//   logger.info(`Express server listening port ${PORT}`)
// })
