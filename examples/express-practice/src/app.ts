import 'module-alias/register'
import express, {Request, Response} from 'express'
import {cats, CatType} from '@/cats.modle'

console.log('Hello World!')

const app: express.Express = express()
const port: number = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/cats', (req: Request, res: Response) => {
  res.send({cats})
})

app.listen(port, () => {
  console.log(`Express server listening port ${port}`)
})
