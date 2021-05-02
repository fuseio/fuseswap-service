import 'reflect-metadata'
import request from 'supertest'
import app from '../../../src/app'
import { DAI } from '../../../src/constants'

describe('/price', () => {
  describe('GET /:tokenAddress', () => {
      test('given params when successful returns 200 and data', async () => {
          const { status,body } = await request(app)
            .get('/api/v1/price/' + DAI.address)
             
          expect(status).toEqual(200)
          expect(body).toHaveProperty('data.price')
      })

      test('given non checksummed address when successful returns 200 and data', async () => {
        const { status, body } = await request(app)
          .get('/api/v1/price/' + DAI.address.toLowerCase())

        expect(status).toEqual(200)
        expect(body).toHaveProperty('data.price')
      })
  })
})
