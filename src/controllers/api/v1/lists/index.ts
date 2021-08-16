import ListService from '@services/list'
import { Request, Response, NextFunction } from 'express'
import Container from 'typedi'

export default {
  async getTokens (req: Request, res: Response, next: NextFunction) {
    try {
      const listService = Container.get(ListService)

      const tokens = await listService.getTokenList()

      res.send({ data: { tokens } })
    } catch (e) {
      next(e)
    }
  }
}
