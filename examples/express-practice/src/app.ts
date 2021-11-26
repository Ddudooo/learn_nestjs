import 'module-alias/register'
import express, { Request, Response } from 'express'
import { cats } from '@/cats.modle'
import { RequestLogging } from '@/middleware/requestLogging.middleware'
import logger from '@/config/logger.winston'

logger.info('Express Server started...')

const app: express.Express = express()
const PORT: number = 3000

app.use(RequestLogging)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/cats', (req: Request, res: Response) => {
  res.send({ cats })
})

app.use((req: Request, res: Response) => {
  logger.warn('PAGE NOT FOUND')
  res.status(404)
  res.json({ statusCode: 404, message: 'Page Not Found', detail: `${req.url} not found. please check URL` })
})

app.listen(PORT, () => {
  logger.info(`Express server listening port ${PORT}`)
})
