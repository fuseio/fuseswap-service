import { Request, Response, NextFunction } from 'express'
import Container from 'typedi'
import TokenService from '@services/token'
import dayjs from '@utils/dayjs'

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
  },

  async getPriceChange (req: Request, res: Response, next: NextFunction) {
    try {
      const { tokenAddress } = req.params
      const tokenService = Container.get(TokenService)

      const oneDayDuration = dayjs.duration({ days: 1 })
      const duration = req.body.duration ? dayjs.duration(req.body.duration) : oneDayDuration
      const priceChange = await tokenService.getTokenPriceChange(tokenAddress, duration)

      res.send({ data: priceChange })
    } catch (e) {
      next(e)
    }
  },

  async getPriceChangeInterval (req: Request, res: Response, next: NextFunction) {
    try {
      const { tokenAddress } : any = req.params
      const { timeframe, interval } : any = req.query

      const tokenService = Container.get(TokenService)

      const priceChanges = await tokenService.getTokenPriceChangeInterval(
        tokenAddress,
        timeframe,
        interval
      )

      res.send({ data: priceChanges })
    } catch (e) {
      next(e)
    }
  }
}
