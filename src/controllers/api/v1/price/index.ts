import { Request, Response, NextFunction } from 'express'
import Container from 'typedi'
import TokenService from '@services/token'
import get from 'lodash.get'

const tokensMap = {
  '0x249be57637d8b013ad64785404b24aebae9b098b': '0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5'
}

export default {
  async getPrice (req: Request, res: Response, next: NextFunction) {
    try {
      const { tokenAddress } = req.params

      const tokenService = Container.get(TokenService)

      const price = await tokenService.getTokenPrice(get(tokensMap, tokenAddress.toLowerCase(), tokenAddress))

      res.send({ data: { price } })
    } catch (e) {
      next(e)
    }
  }
}
