import { Router } from 'express'
import PriceController from '@controllers/api/v1/price'
import { getPriceChangeIntervalValidation, getTokenPriceValidation } from '@controllers/api/v1/price/validations'

const router = Router()

/**
 * @api {get} /api/v1/pricechange/:tokenAddress Get price change for token over last 24 hours
 * @apiName GetTokenPriceChange
 * @apiGroup PriceChange
 *
 * @apiParam {String} tokenAddress The currency address
 *
 * @apiSuccess {String} priceChange The price change ratio of the token
 * @apiSuccess {String} currentPrice The current price of the token
 * @apiSuccess {String} previousPrice The previous price of the token
 *
 * @apiSuccessExample {json} Success-Response:
 *
 *  {
 *      "data": {
 *          "priceChange": "4.761727644165598",
 *          "currentPrice": "3760.8426158182515",
 *          "previousPrice": "3589.901293526158"
 *      }
 *  }
 *
 *
 * */
router.get(
  '/:tokenAddress',
  getTokenPriceValidation,
  PriceController.getPriceChange
)

/**
 * @api {post} /api/v1/pricechange/:tokenAddress Get price change for token over time duration
 * @apiName GetTokenPriceChangeOverDuration
 * @apiGroup PriceChange
 *
 * @apiParam {String} tokenAddress The currency address
 * @apiBody {Object} duration The duration object to calculate the price change over the timeFrame
 * duration should be passed as an object according to https://day.js.org/docs/en/durations/creating
 * for example duration of {days: 1} means a duration of one day
 *
 * @apiSuccess {String} priceChange The price change ratio of the token
 * @apiSuccess {String} currentPrice The current price of the token
 * @apiSuccess {Object} previousPrice The previous price of the token
 *
 * @apiSuccessExample {json} Success-Response:
 *
 *  {
 *      "data": {
 *          "priceChange": "4.761727644165598",
 *          "currentPrice": "3760.8426158182515",
 *          "previousPrice": "3589.901293526158"
 *      }
 *  }
 *
 *
 * */
router.post(
  '/:tokenAddress',
  getTokenPriceValidation,
  PriceController.getPriceChange
)

/**
 * @api {get} /api/v1/pricechange/interval/:timeFrame/:tokenAddress Get price changes over an interval for token
 * @apiName GetPriceChangeInterval
 * @apiGroup PriceChangeInterval
 *
 * @apiParam {String} tokenAddress The address of the token
 * @apiParam {string="ALL","MONTH","WEEK","DAY","HOUR"} timeFrame How far to look back
 * @apiQuery (Query) {number=60,300,1800,3600,86400} [interval=3600] The chunk in seconds
 *
 * @apiSuccess {Object[]} priceChanges List of price changes
 * @apiSuccess {Number} priceChanges.timestamp The time in seconds at which the price change occurred
 * @apiSuccess {Number} priceChanges.priceChange The price change ratio of the token at the specified timestamp
 * @apiSuccess {Number} priceChanges.previousPrice The previous price at the specified timestamp
 * @apiSuccess {Number} priceChanges.price The price at the specified timestamp
 *
 * @apiSuccessExample {json} Success-Response:
 *
 *  {
 *    "data": [
 *      {
 *        "timestamp": 1628542800,
          "priceChange": 0,
          "previousPrice": "43935.339297872226",
          "currentPrice": "43935.339297872226"
 *      }
 *    ]
 * }
 */
router.get(
  '/interval/:timeFrame/:tokenAddress',
  getPriceChangeIntervalValidation,
  PriceController.getPriceChangeInterval
)

export default router
