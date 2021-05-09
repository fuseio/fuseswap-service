import { Router } from 'express'
import PriceController from '@controllers/api/v1/price'
import { getTokenPriceValidation } from '@controllers/api/v1/price/validations'

const router = Router()

/**
 * @api {get} /pricechange Get price change for token over last 24 hours
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
 * @api {get} /pricechange Get price change stats of the token
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
/**
 * @api {post} /pricechange Get price change for token over time duration
 * @apiName GetTokenPriceChangeOverDuration
 * @apiGroup PriceChange
 *
 * @apiParam {String} tokenAddress The currency address
 * @apiParam {Object} duration The duration object to calculate the price change over the timeframe
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
 * @api {post} /pricechange Get price change for token over time duration
 * @apiName GetTokenPriceChangeOverDuration
 * @apiGroup PriceChange
 *
 * @apiParam {String} tokenAddress The currency address
 * @apiParam {Object} duration The duration object to calculate the price change over the timeframe
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

export default router
