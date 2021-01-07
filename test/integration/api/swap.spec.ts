import 'reflect-metadata'
import request from 'supertest'
import app from '../../../src/app'
import { DAI, USDC } from '../../../src/constants'

describe('/swap', () => {
  describe('POST /swapcallparameters', () => {
    test('given params when successful returns 200 and data', async () => {
      const { status, body } = await request(app)
        .post('/api/v1/swap/swapcallparameters')
        .send({
          currencyIn: DAI.address,
          currencyOut: USDC.address,
          amountIn: '1',
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

    test('given params when no liquidity returns 400 and message', async () => {
      const { status, body } = await request(app)
        .post('/api/v1/swap/swapcallparameters')
        .send({
          currencyIn: '0x495d133B938596C9984d462F007B676bDc57eCEC',
          currencyOut: '0xbf0718762B7951D56C52Cc7f75e4fa665a7FF0E5',
          amountIn: '1',
          allowedSlippage: 1,
          ttl: 60 * 20,
          recipient: '0x5670d7076E7b3604ceb07c003ff0920490756587',
        })

      expect(status).toEqual(200)
      expect(body.message).toBe('No liquidity for trade')
    })

    test('given required params and no optionals params should return 200 and data', async () => {
      const { status, body } = await request(app)
        .post('/api/v1/swap/swapcallparameters')
        .send({
          currencyIn: '0x495d133B938596C9984d462F007B676bDc57eCEC',
          currencyOut: '0xbf0718762B7951D56C52Cc7f75e4fa665a7FF0E5',
          amountIn: '1',
          recipient: '0x5670d7076E7b3604ceb07c003ff0920490756587',
        })

      expect(status).toEqual(200)
      expect(body).toBeDefined()
    })
  })

  describe('POST /trade', () => {
    test('given params should return 200 and trade data', async () => {
      const { status, body } = await request(app)
        .post('/api/v1/swap/trade')
        .send({
          currencyIn: '0x495d133B938596C9984d462F007B676bDc57eCEC',
          currencyOut: '0xbf0718762B7951D56C52Cc7f75e4fa665a7FF0E5',
          amountIn: '1',
        })

      expect(status).toEqual(200)
      expect(body).toBeDefined()
    })

    test('given params when not provided then return 400', async () => {
      const { status } = await request(app)
        .post('/api/v1/swap/trade')
        .send({})

      expect(status).toEqual(400)
    })
  })
})
