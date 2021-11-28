import 'module-alias/register'
import express, { Request, Response } from 'express'
import { RequestAssignId, RequestLogging } from '@/middleware/requestLogging.middleware'
import logger from '@/config/logger.winston'
import CatsRouter from '@/router/cats/router/cats.router'
import 'reflect-metadata'

logger.info('Express Server started...')

const app: express.Express = express()
const PORT: number = 3000

app.use(express.json())
app.use(RequestAssignId)
app.use(RequestLogging)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use('/cats', CatsRouter)

app.use((req: Request, res: Response) => {
  logger.warn('PAGE NOT FOUND')
  res.status(404)
  res.json({ statusCode: 404, message: 'Page Not Found', detail: `${req.url} not found. please check URL` })
})

app.listen(PORT, () => {
  logger.info(`Express server listening port ${PORT}`)
})
