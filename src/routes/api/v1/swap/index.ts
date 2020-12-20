import { Router } from 'express'
import SwapController from '@controllers/api/v1/swap'
import { swapCallParametersValidation } from '@controllers/api/v1/swap/validations'

const router = Router()

/**
 * @api {post} /swap/swapcallparameters Create swap parameters for a Trade
 * @apiName PostSwapCallParameters
 * @apiGroup Swap
 *
 * @apiParam {String} currencyIn The currency to spend
 * @apiParam {String} currencyOut The desired currency out address
 * @apiParam {String} inputAmount The desired amount to spend
 * @apiParam {string} recipient The address that should receive the output of the swap
 * @apiParam {Number} allowedSlippage How much the execution price is allowed to move unfavorably
 *  from the trade execution price
 * @apiParam {Number} ttl How long the swap is valid until it expires
 *
 * @apiSuccess {String} methodName The method to call on Fuseswap RouterV2
 * @apiSuccess {String[]} args The arguments to pass to the method, all hex encoded
 * @apiSuccess {String} value The amount of wei to send in hex
 * @apiSuccess {Object} rawTxn Unsigned transaction which represents the transaction that needs
 *  to be signed and submitted to the network
 *
 * @apiSuccessExample {json} Success-Response:
 *    {
 *         "methodName": "swapExactETHForTokens",
 *         "args": [
 *             "0x8f1573df661b2f",
 *             [
 *                 "0x0BE9e53fd7EDaC9F859882AfdDa116645287C629",
 *                 "0xFaDbBF8Ce7D5b7041bE672561bbA99f79c532e10",
 *                 "0x94Ba7A27c7A95863d1bdC7645AC2951E0cca06bA"
 *             ],
 *             "0x5670d7076E7b3604ceb07c003ff0920490756587",
 *             "0x5fdf7e43"
 *         ],
 *         "value": "0xde0b6b3a7640000",
 *         "rawTxn": {
 *             "data": "0x7ff36ab5000000000000000000000000000000000000000000000000008f1573df661b2f00000000000000000000000000000000000000000000000000000000000000800000000000000000000000005670d7076e7b3604ceb07c003ff0920490756587000000000000000000000000000000000000000000000000000000005fdf7e4300000000000000000000000000000000000000000000000000000000000000030000000000000000000000000be9e53fd7edac9f859882afdda116645287c629000000000000000000000000fadbbf8ce7d5b7041be672561bba99f79c532e1000000000000000000000000094ba7a27c7a95863d1bdc7645ac2951e0cca06ba",
 *             "to": "0xFB76e9E7d88E308aB530330eD90e84a952570319",
 *             "value": {
 *                 "type": "BigNumber",
 *                 "hex": "0x0de0b6b3a7640000"
 *             }
 *         }
 *    }
 *
 */
router.post(
  '/swapcallparameters',
  swapCallParametersValidation,
  SwapController.swapCallParameters
)

export default router
