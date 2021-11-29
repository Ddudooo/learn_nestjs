import express, { RequestHandler, Router } from 'express'
import winston from 'winston'
import http from 'http'

export default class Server {
  private readonly app: express.Application

  private readonly SERVER_PORT: number

  private readonly logger: winston.Logger

  constructor(port: number, logger: winston.Logger) {
    this.app = express()
    this.SERVER_PORT = port
    this.logger = logger
  }

  public setRouter(router: Router, prefixUrl?: string) {
    if (prefixUrl) {
      this.app.use(prefixUrl, router)
    } else {
      this.app.use(router)
    }
  }

  public setMiddleware(middleware: RequestHandler) {
    this.app.use(middleware)
  }

  public start(): http.Server {
    return this.app.listen(this.SERVER_PORT, () =>
      this.logger.info(`Express server listening port ${this.SERVER_PORT}`)
    )
  }
}
