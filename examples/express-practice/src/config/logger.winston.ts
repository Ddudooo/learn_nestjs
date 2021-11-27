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
    morgan: 7,
    debug: 8,
  },
  colors: {
    error: 'red bold',
    warn: 'yellow',
    info: 'green',
    data: 'grey',
    verbose: 'cyan',
    socket: 'magenta bold',
    trace: 'yellow',
    morgan: 'magenta bold',
    debug: 'blue bold',
  },
}

const customColorize = winston.format.colorize()
customColorize.addColors(config.colors)

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
        customColorize,
        winston.format.printf(info => {
          if (info.level === 'MORGAN') {
            return `${info.timestamp} ${process.pid} ${info.level} ${info.message}`
          }
          return `${info.timestamp} ${process.pid} ${info.level}: ${info.message}`
        })
      ),
    }),
  ],
}) as winston.Logger & Record<keyof typeof config.levels, winston.LeveledLogMethod>

export default logger
