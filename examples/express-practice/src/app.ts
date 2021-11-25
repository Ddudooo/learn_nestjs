import 'module-alias/register'
import express, { NextFunction, Request, Response } from 'express'
import { cats } from '@/cats.modle'
import logger from '@/config/logger.winston'

console.log('Hello World!')

const app: express.Express = express()
const port: number = 3000

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.debug('request Headers', { headers: req.rawHeaders })
  next()
})

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/cats', (req: Request, res: Response) => {
  res.send({ cats })
})

app.listen(port, () => {
  console.log(`Express server listening port ${port}`)
})
