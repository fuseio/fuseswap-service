import request from 'supertest'
import app from '../../../src/app'
import { DAI, USDC } from '../../../src/constants'

describe('/swap', () => {
  describe('POST /swapcallparameters', () => {
    test('given params when successful returns 200 and data', async () => {
      const { status, body } = await request(app)
        .post('/api/v1/swap/swapcallparameters')
        .send({
          inputCurrency: DAI.address,
          outputCurrency: USDC.address,
          inputAmount: '1',
          allowedSlippage: 1,
          ttl: Math.floor(Date.now() / 1000) + 60 * 20,
          recipient: '0x5670d7076E7b3604ceb07c003ff0920490756587',
        })
      expect(status).toEqual(200)
      expect(body).toBeDefined()
    })

    test('when params not provided should return 400', async () => {
      const { status } = await request(app)
        .post('/api/v1/swap/swapcallparameters')
        .send({})
      expect(status).toEqual(400)
    })
  })
})
