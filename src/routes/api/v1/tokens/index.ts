import { Router } from 'express'
import ListsController from '@controllers/api/v1/lists'

const router = Router()

/**
 * @api {get} /api/v1/tokens Returns a list of tokens on fuse
 * @apiGroup Tokens
 *
 * @apiSuccess {Object[]} tokens List of tokens
 * @apiSuccess {String} tokens.name The name of the token
 * @apiSuccess {String} tokens.symbol The symbol of the token
 * @apiSuccess {Number} tokens.decimals The number of decimals the token
 * @apiSuccess {String} tokens.address The address of the token on fuse network
 * @apiSuccess {Object[]} [tokens.underlyingTokens] [lp only] The list of underlying tokens for the lp token type
 * @apiSuccess {String} [token.underlyingTokens.address] [lp only] The address of the underlying token
 * @apiSuccess {String} [token.underlyingTokens.name] [lp only] The name of the underlying token
 * @apiSuccess {String} [token.underlyingToken.symbol] [lp only] The symbol of the underlying token
 * @apiSuccess {String="misc","bridged","lp"} tokens.type The type of token
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
              "logoURI": "https://fuselogo.s3.eu-central-1.amazonaws.com/fuse-dollar.png",
              "type": "misc"
            },
            {
              "name": "Imagine UBI on Fuse",
              "symbol": "IUBI",
              "address": "0x002231dce05117dcd3f1d471c1ea4c08eb844ed2",
              "decimals": 18,
              "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x25730D6b66552bBCB6Ed22900cA9473a6cfbB0F0/logo.png",
              "type": "bridged"
            },
            {
              "address": "0x019672f9a005309eb048ecc48e6bf8350376786b",
              "name": "FuseSwap RED-BLUE",
              "symbol": "FS RED-BLUE",
              "decimals": 18,
              "underlyingTokens": [
                {
                  "address": "0x074f072412d4acf8f9faf78288d303b2623f6a26",
                  "name": "Redcoat on Fuse",
                  "symbol": "RED"
                },
                {
                  "address": "0x989ab59727c787e3248818685fcfa281ceca47e2",
                  "name": "Bluecoat on Fuse",
                  "symbol": "BLUE"
                }
              ],
              "type": "lp"
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
