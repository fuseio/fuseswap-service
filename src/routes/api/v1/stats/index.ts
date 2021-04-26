import { Router } from 'express'
import StatsController from '@controllers/api/v1/stats'
import { getTokenStatsValidation } from '@controllers/api/v1/stats/validations'

const router = Router()

/**
 * @api {get} /stats Get historical statistics of the token
 * @apiName GetTokenStats
 * @apiGroup Stats
 *
 * @apiParam {String} tokenAddress The currency address
 *
 * @apiSuccess {Number} price The price of the token
 *
 * @apiSuccessExample {json} Success-Response:
 *
 * {
 *  "data": {
 *      "price":1.009884197756788
 *   }
 * }
 *
 *
 *
 * */
router.get(
  '/:tokenAddress',
  getTokenStatsValidation,
  StatsController.getStats
)

export default router
