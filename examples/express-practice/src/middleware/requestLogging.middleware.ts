import { RequestHandler } from 'express'
import { v4 as uuidv4 } from 'uuid'
import morgan from 'morgan'
import logger from '@/config/logger.winston'

// @ts-ignore
morgan.token('id', req => req.id)

// eslint-disable-next-line import/prefer-default-export
export const RequestAssignId: RequestHandler = (req, res, next) => {
  // @ts-ignore
  req.id = uuidv4()
  next()
}

class WinstonStream {
  // eslint-disable-next-line class-methods-use-this
  write(message: string) {
    logger.morgan(message.substring(0, message.lastIndexOf('\n')))
  }
}

const winstonStream = new WinstonStream()

// eslint-disable-next-line import/prefer-default-export
export const RequestLogging: RequestHandler = morgan(':id :method :url :response-time', { stream: winstonStream })
