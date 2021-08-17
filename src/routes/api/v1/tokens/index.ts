import { Router } from 'express'
import ListsController from '@controllers/api/v1/lists'

const router = Router()

/**
 * @api {get} /api/v1/tokens Returns a list of tokens on fuse
 * @apiGroup Tokens
 *
 * @apiSuccess {Object} tokens Array of tokens
 *
 * @apiSuccessExample {json} Success-Response
 *
 * {
 *    "data": {
 *      "tokens": [
 *          {
              "name": "Fuse Dollar",
              "symbol": "fUSD",
              "decimals": 18,
              "address": "0x249BE57637D8B013Ad64785404b24aeBaE9B098B",
              "type": "misc"
            },
            {
              "name": "Wrapped FUSE",
              "symbol": "WFUSE",
              "decimals": 18,
              "address": "0x0BE9e53fd7EDaC9F859882AfdDa116645287C629",
              "type": "misc"
            },
            {
              "name": "Imagine UBI on Fuse",
              "symbol": "IUBI",
              "address": "0x002231dce05117dcd3f1d471c1ea4c08eb844ed2",
              "decimals": 18,
              "type": "bridged"
            }
 *      ]
 *    }
 * }
 */
router.get(
  '/',
  ListsController.getTokens
)

export default router
