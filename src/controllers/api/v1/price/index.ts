import { Request, Response, NextFunction } from 'express'
import Container from 'typedi'
import TokenService from '@services/token'

export default {
  async getPrice (req: Request, res: Response, next: NextFunction) {
    try {
      const { tokenAddress } = req.params

      const tokenService = Container.get(TokenService)

      const price = await tokenService.getTokenPrice(tokenAddress)

      res.send({ data: { price } })
    } catch (e) {
      next(e)
    }
  }
}
