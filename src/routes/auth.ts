import jwt from 'express-jwt'
import config from 'config'

const secret: string = config.get('api.secret')

const auth = {
  required: jwt({
    secret: secret,
    credentialsRequired: true,
  }),
  optional: jwt({
    secret: secret,
    credentialsRequired: false,
  }),
}

module.exports = auth
