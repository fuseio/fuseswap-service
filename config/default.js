module.exports = {
  api: {
    allowCors: true,
    secret: 'secret',
    tokenExpiresIn: '7d',
    port: 3000,
    timeout: 5000
  },
  mongo: {
    debug: true,
    uri: 'mongodb://localhost/test'
  },
  mail: {
    sendgrid: {
      templates: {}
    }
  },
  rpcUrl: 'https://nd-942-551-550.p2pify.com/29d9adc81d097da8de657a5c8c773586',
  maxResultSize: 50
}
