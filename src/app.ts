import 'reflect-metadata'
import 'module-alias/register'
import 'express-async-errors'
import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import util from 'util'
import config from 'config'
import cors from 'cors'
import routes from './routes'
import RequestError from '@models/requestError'
import { NotFoundError } from '@models/error'

const logger = morgan('combined')

console.log(util.inspect(config, { depth: null }))

const isProduction = process.env.NODE_ENV === 'production'

const app = express()

if (config.get('api.allowCors')) {
  const corsHandler = cors()
  app.use(corsHandler)
}

app.use(logger)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(routes)

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(new NotFoundError())
})

/// error handlers
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function (err: RequestError, req: Request, res: Response, next: NextFunction) {
  if (!isProduction) console.log(err.stack)

  res.status(err?.status || 500)

  res.json({
    error: {
      code: err?.code,
      message: err?.message
    }
  })
})

export default app
