import { ETHER as FUSE } from '@fuseio/fuse-swap-sdk'
import 'reflect-metadata'
import request from 'supertest'
import app from '../../../src/app'
import { DAI, FUSD, FUSE_ADDRESS, USDC } from '../../../src/constants'

describe('/swap', () => {
  describe('POST /swapcallparameters', () => {
    test('given params when successful returns 200 and expected response', async () => {
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
      expect(body).toHaveProperty('methodName')
      expect(body).toHaveProperty('args')
      expect(body).toHaveProperty('rawTxn')
      expect(body).toHaveProperty('value')
    })

    test('given params (non checksummed) when successful returns 200 and expected response', async () => {
      const { status, body } = await request(app)
        .post('/api/v1/swap/swapcallparameters')
        .send({
          currencyIn: DAI.address.toLowerCase(),
          currencyOut: USDC.address.toLowerCase(),
          amountIn: '1',
          allowedSlippage: 1,
          ttl: Math.floor(Date.now() / 1000) + 60 * 20,
          recipient: '0x5670d7076E7b3604ceb07c003ff0920490756587',
        })

      expect(status).toEqual(200)
      expect(body).toHaveProperty('methodName')
      expect(body).toHaveProperty('args')
      expect(body).toHaveProperty('rawTxn')
      expect(body).toHaveProperty('value')
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
      expect(body.message).toBe('No Liquidity For Trade')
    })

    test('given required params and no optionals params should return 200 and expected response', async () => {
      const { status, body } = await request(app)
        .post('/api/v1/swap/swapcallparameters')
        .send({
          currencyIn: DAI.address,
          currencyOut: USDC.address,
          amountIn: '1',
          recipient: '0x5670d7076E7b3604ceb07c003ff0920490756587',
        })

      expect(status).toEqual(200)
      expect(body).toHaveProperty('methodName')
      expect(body).toHaveProperty('args')
      expect(body).toHaveProperty('rawTxn')
      expect(body).toHaveProperty('value')
    })

    test('given peg tokens should return 200 and expected response', async () => {
      const { status, body } = await request(app)
        .post('/api/v1/swap/swapcallparameters')
        .send({
          currencyIn: FUSD.address,
          currencyOut: USDC.address,
          amountIn: '1',
          recipient: '0x5670d7076E7b3604ceb07c003ff0920490756587',
        })

      expect(status).toEqual(200)
      expect(body).toHaveProperty('methodName', 'swap')
      expect(body).toHaveProperty('args')
      expect(body).toHaveProperty('rawTxn')
      expect(body).toHaveProperty('value')
    })

    test('given peg token (non checksummed) should return 200 and expected response', async () => {
      const { status, body } = await request(app)
        .post('/api/v1/swap/swapcallparameters')
        .send({
          currencyIn: FUSD.address.toLowerCase(),
          currencyOut: USDC.address.toLowerCase(),
          amountIn: '1',
          recipient: '0x5670d7076E7b3604ceb07c003ff0920490756587',
        })

      expect(status).toEqual(200)
      expect(body).toHaveProperty('methodName', 'swap')
      expect(body).toHaveProperty('args')
      expect(body).toHaveProperty('rawTxn')
      expect(body).toHaveProperty('value')
    })

    test('given fusetoken (FUSE) and other token should return 200 and expected response', async () => {
      const { status, body } = await request(app)
        .post('/api/v1/swap/swapcallparameters')
        .send({
          currencyIn: FUSE.symbol,
          currencyOut: USDC.address.toLowerCase(),
          amountIn: '1',
          recipient: '0x5670d7076E7b3604ceb07c003ff0920490756587',
        })

      expect(status).toEqual(200)
      expect(body).toHaveProperty('methodName', 'swapExactETHForTokens')
      expect(body).toHaveProperty('args')
      expect(body).toHaveProperty('rawTxn')
      expect(body).toHaveProperty('value')
    })

    test('given fusetoken (zeroAddress) and other token should return 200 and expected response', async () => {
      const { status, body } = await request(app)
        .post('/api/v1/swap/swapcallparameters')
        .send({
          currencyIn: FUSE_ADDRESS,
          currencyOut: USDC.address.toLowerCase(),
          amountIn: '1',
          recipient: '0x5670d7076E7b3604ceb07c003ff0920490756587',
        })

      expect(status).toEqual(200)
      expect(body).toHaveProperty('methodName', 'swapExactETHForTokens')
      expect(body).toHaveProperty('args')
      expect(body).toHaveProperty('rawTxn')
      expect(body).toHaveProperty('value')
    })
  })

  describe('POST /trade', () => {
    test('given params should return 200 and expected response', async () => {
      const { status, body } = await request(app)
        .post('/api/v1/swap/trade')
        .send({
          currencyIn: DAI.address,
          currencyOut: USDC.address,
          amountIn: '1',
        })

      expect(status).toEqual(200)
      expect(body).toHaveProperty('data.info')
      expect(body).toHaveProperty('data.trade')
    })

    test('given params (non checksummed) should return 200 and expected respose', async () => {
      const { status, body } = await request(app)
        .post('/api/v1/swap/trade')
        .send({
          currencyIn: DAI.address.toLowerCase(),
          currencyOut: USDC.address.toLowerCase(),
          amountIn: '1',
        })

      expect(status).toEqual(200)
      expect(body).toHaveProperty('data.info')
      expect(body).toHaveProperty('data.trade')
    })

    test('given params when not provided then return 400', async () => {
      const { status } = await request(app)
        .post('/api/v1/swap/trade')
        .send({})

      expect(status).toEqual(400)
    })
  })
})
