import config from 'config'
import app from './app'

const server = app.listen(config.get('api.port') || 8080, function () {
  const address: any = server && server.address()
  console.log('Listening on port ' + address.port)
})
