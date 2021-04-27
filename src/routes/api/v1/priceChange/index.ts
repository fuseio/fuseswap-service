import { Router } from 'express'
import PriceController from '@controllers/api/v1/price'
import { getTokenPriceValidation } from '@controllers/api/v1/price/validations'

const router = Router()

/**
 * @api {get} /pricechange Get price change stats of the token
 * @apiName GetTokenPriceChange
 * @apiGroup PriceChange
 *
 * @apiParam {String} tokenAddress The currency address
 *
 * @apiSuccess {String} priceChange The price change ratio of the token
 * @apiSuccess {String} currentPrice The current price of the token
 * @apiSuccess {Object} openingStat the historic opening stat of the token (see stats endpoint)
 *
 * @apiSuccessExample {json} Success-Response:
 *
 *  {
 *      "data": {
 *          "priceChange": "-0.0007561320055728409",
 *          "currentPrice": "2507.7926905931677",
 *          "openingStat": [
 *              {
 *                  "address": "0xa722c13135930332eb3d749b2f0906559d2c5b99",
 *                  "price": "2509.690347789208280724433142784366",
 *                  "volume": "2681.774272338948506536539339084855",
 *                  "timestamp": 1619481600,
 *                  "date": "2021-04-27T00:00:00.000Z"
 *              }
 *          ]
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

export default router
