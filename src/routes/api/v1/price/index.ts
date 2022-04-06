import { Router } from 'express'
import PriceController from '@controllers/api/v1/price'
import { getTokenPriceValidation } from '@controllers/api/v1/price/validations'

const router = Router()

/**
 * @api {get} /api/v1/price/:tokenAddress Get latest price for a token
 * @apiName GetTokenPrice
 * @apiGroup Price
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
  getTokenPriceValidation,
  PriceController.getPrice
)

export default router
