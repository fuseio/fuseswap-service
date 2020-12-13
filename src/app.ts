import 'module-alias/register'
import 'express-async-errors'
import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import util from 'util'
import config from 'config'
import cors from 'cors'
import routes from './routes'
import RequestError from './models/requestError'

const logger = morgan('combined')

async function init () {
  console.log(util.inspect(config, { depth: null }))

  var isProduction = process.env.NODE_ENV === 'production'

  var app = express()

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
    var err = new RequestError(404, 'Not Found')
    next(err)
  })

  /// error handlers
  if (!isProduction) {
    app.use(function (err: RequestError, req: Request, res: Response, next: NextFunction) {
      console.log(err.stack)

      res.status(err.status || 500)

      res.json({ 'errors': {
        message: err.message,
        error: err
      } })
    })
  } else {
    app.use(function (err: RequestError, req: Request, res: Response, next: NextFunction) {
      res.status(err.status || 500)
      res.json({ 'errors': {
        message: err.message,
        error: {}
      } })
    })
  }

  // finally, let's start our server...
  var server = app.listen(config.get('api.port') || 8080, function () {
    const address: any = server && server.address()
    console.log('Listening on port ' + address.port)
  })
}

init()