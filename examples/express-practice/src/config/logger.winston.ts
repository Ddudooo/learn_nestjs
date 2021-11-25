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
        format.colorize(),
        format.printf((info: TransformableInfo) => {
          const prefix = `${info.timestamp} ${process.pid} ${info.level}`
          const msg = []
          if (info.message.indexOf('\n') > 0 || info.message.indexOf('\r') > 0) {
            // eslint-disable-next-line no-restricted-syntax
            for (const a of info.message.split('\n')) {
              if (a.trim().length > 0) {
                // eslint-disable-next-line no-restricted-syntax
                for (const b of a.split('\r')) {
                  if (b.trim().length > 0) {
                    msg.push(`${prefix} ${b}`)
                  }
                }
              }
            }
          } else {
            msg.push(`${prefix} ${info.message}`)
          }

          if (info.stack && env !== 'production') {
            // eslint-disable-next-line no-restricted-syntax
            for (const a of info.stack.split('\n')) {
              if (a.trim().length > 0) {
                // eslint-disable-next-line no-restricted-syntax
                for (const b of a.split('\r')) {
                  if (b.trim().length > 0) {
                    msg.push(`${prefix} ${b}`)
                  }
                }
              }
            }
          }
          msg.push(`${JSON.stringify(info.headers)}`)
          return msg.join('\n')
        })
      ),
    }),
  ],
})

export default logger
