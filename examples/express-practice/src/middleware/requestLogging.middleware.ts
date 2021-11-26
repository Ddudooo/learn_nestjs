import { RequestHandler } from 'express'
import logger from '@/config/logger.winston'

// eslint-disable-next-line import/prefer-default-export
export const RequestLogging: RequestHandler = (req, res, next): void => {
  logger.verbose('request Headers')
  logger.verbose({ headers: req.rawHeaders })
  next()
}
