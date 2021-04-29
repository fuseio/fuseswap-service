import { Request, Response, NextFunction } from 'express'
import Container from 'typedi'
import TokenService from '@services/token'

export default {
  async getStats (req: Request, res: Response, next: NextFunction) {
    try {
      const { tokenAddress } = req.params
      const limit: string = req.query.limit as string

      const tokenService = Container.get(TokenService)

      const stats = await tokenService.getTokenStats(tokenAddress, parseInt(limit))

      res.send({ data: stats })
    } catch (e) {
      next(e)
    }
  }
}
