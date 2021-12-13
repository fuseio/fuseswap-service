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
    uri: 'mongodb://localhost/test',
  },
  mail: {
    sendgrid: {
      templates: {},
    },
  },
  rpcUrl: 'https://rpc.fuse.io',
}
