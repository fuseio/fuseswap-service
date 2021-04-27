import { Router } from 'express'
import StatsController from '@controllers/api/v1/stats'
import { getTokenStatsValidation } from '@controllers/api/v1/stats/validations'

const router = Router()

/**
 * @api {get} /stats/:tokenAddress?=limit={limit} Get historical statistics of the token
 * @apiName GetTokenStats
 * @apiGroup Stats
 *
 * @apiParam {String} tokenAddress The currency address
 * @apiParam {String} limit The number of days to return statistics for (query param)
 *
 * @apiSuccess {Object[]} array of token stats objects, see example below
 *
 * @apiSuccessExample {json} Success-Response:
 *
 * {
 *  "data": [
 *       {
 *           "address": "0xa722c13135930332eb3d749b2f0906559d2c5b99",
 *           "price": "2389.74779405372110747871079158035",
 *           "volume": "3343.67560523501352604818272285103",
 *           "timestamp": 1619395200,
 *           "date": "2021-04-26T00:00:00.000Z"
 *       }
 * ]
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
