import winston, { format, transports } from 'winston'
// eslint-disable-next-line import/no-extraneous-dependencies
import { TransformableInfo } from 'logform'

const env = process.env.NODE_ENV || 'development'

const config = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    data: 3,
    verbose: 4,
    socket: 5,
    trace: 6,
    debug: 7,
  },
  colors: {
    error: 'red bold',
    warn: 'yellow',
    info: 'green',
    data: 'grey',
    verbose: 'cyan',
    socket: 'magenta bold',
    trace: 'yellow',
    debug: 'blue bold',
  },
}

const logger = winston.createLogger({
  levels: config.levels,
  level: 'debug',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.Console({
      level: env === 'development' ? 'debug' : 'info',
      silent: env === 'test',
      format: format.combine(
        format((info: TransformableInfo) => {
          // eslint-disable-next-line no-param-reassign
          info.level = `[${info.level.toUpperCase()}]`
          return info
        })(),
        format.prettyPrint(),
        format.colorize({ all: true }),
        winston.format.printf(info => `${info.timestamp} ${process.pid} ${info.level}: ${info.message}`)
      ),
    }),
  ],
})

export default logger
