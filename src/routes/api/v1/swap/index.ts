import { Router } from 'express'
import SwapController from '@controllers/api/v1/swap'
import {
  requestParametersValidation,
  quoteValidation
} from '@controllers/api/v1/swap/validations'

const router = Router()

/**
 * @api {post} /api/v1/swap/requestparameters Create swap parameters for a Trade
 * @apiName PostRequestParameters
 * @apiGroup Swap
 *
 * @apiBody {String} currencyIn The currency to spend
 * @apiBody {String} currencyOut The desired currency out address
 * @apiBody {String} inputAmount The desired amount to spend
 * @apiBody {string} recipient The address that should receive the output of the swap
 * @apiBody {Number} [allowedSlippage=50] How much the execution price is allowed to move unfavorably
 *  from the trade execution price in Basis Points(BIPS)
 * @apiBody {Number} [ttl=1200] How long the swap is valid until it expires in seconds
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
 * @apiError {Object} error Object with information about the error
 *
 * @apiErrorExample {json} Error-Response:
 *  {
 *      "error": {
 *          "code": 1,
 *          "message": "Pool is out of liquidity"
 *      }
 * }
 *
 */
router.post(
  '/requestparameters',
  requestParametersValidation,
  SwapController.requestParameters
)

/**
 * @api {post} /api/v1/swap/quote Create a quote for a token pair
 * @apiName PostQuote
 * @apiGroup Swap
 *
 * @apiBody {String} currencyIn The currency to spend
 * @apiBody {String} currencyOut The desired currency out address
 * @apiBody {String} amountIn The desired amount to spend
 *
 * @apiSuccess {Object} info Simplied quote object containing information about the trade
 * @apiSuccess {Object} trade The trade object containing information about the <a href="https://uniswap.org/docs/v2/SDK/trade">trade</a> e.g price
 *
 * @apiSuccessExample {json} Success-Response:
 *
 *{
    "data": {
        "info": {
            "inputAmount": "1",
            "outputAmount": "965.616",
            "route": [
                "WETH",
                "USDC"
            ],
            "inputToken": "WETH",
            "outputToken": "USDC",
            "executionPrice": "965.617",
            "nextMidPrice": "722.082",
            "priceImpact": "25.612"
        },
        "trade": {
            "route": {
                "pairs": [
                    {
                        "liquidityToken": {
                            "decimals": 18,
                            "symbol": "UNI-V2",
                            "name": "Uniswap V2",
                            "chainId": 122,
                            "address": "0x20a680D69a5aE2677B8CF43aBF63aAD6D8d5119A"
                        },
                        "tokenAmounts": [
                            {
                                "numerator": [
                                    -491531807
                                ],
                                "denominator": [
                                    1000000
                                ],
                                "currency": {
                                    "decimals": 6,
                                    "symbol": "USDC",
                                    "name": "USD Coin on Fuse",
                                    "chainId": 122,
                                    "address": "0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5",
                                    "tokenInfo": {
                                        "name": "USD Coin on Fuse",
                                        "address": "0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5",
                                        "symbol": "USDC",
                                        "decimals": 6,
                                        "chainId": 122,
                                        "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
                                    },
                                    "tags": []
                                },
                                "token": {
                                    "decimals": 6,
                                    "symbol": "USDC",
                                    "name": "USD Coin on Fuse",
                                    "chainId": 122,
                                    "address": "0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5",
                                    "tokenInfo": {
                                        "name": "USD Coin on Fuse",
                                        "address": "0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5",
                                        "symbol": "USDC",
                                        "decimals": 6,
                                        "chainId": 122,
                                        "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
                                    },
                                    "tags": []
                                }
                            },
                            {
                                "numerator": [
                                    -2070596893,
                                    682205361
                                ],
                                "denominator": [
                                    -1486618624,
                                    232830643
                                ],
                                "currency": {
                                    "decimals": 18,
                                    "symbol": "WETH",
                                    "name": "Wrapped Ether on Fuse",
                                    "chainId": 122,
                                    "address": "0xd8Bf72f3e163B9CF0C73dFdCC316417A5ac20670",
                                    "tokenInfo": {
                                        "name": "Wrapped Ether on Fuse",
                                        "address": "0xd8Bf72f3e163B9CF0C73dFdCC316417A5ac20670",
                                        "symbol": "WETH",
                                        "decimals": 18,
                                        "chainId": 122,
                                        "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
                                    },
                                    "tags": []
                                },
                                "token": {
                                    "decimals": 18,
                                    "symbol": "WETH",
                                    "name": "Wrapped Ether on Fuse",
                                    "chainId": 122,
                                    "address": "0xd8Bf72f3e163B9CF0C73dFdCC316417A5ac20670",
                                    "tokenInfo": {
                                        "name": "Wrapped Ether on Fuse",
                                        "address": "0xd8Bf72f3e163B9CF0C73dFdCC316417A5ac20670",
                                        "symbol": "WETH",
                                        "decimals": 18,
                                        "chainId": 122,
                                        "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
                                    },
                                    "tags": []
                                }
                            }
                        ]
                    }
                ],
                "path": [
                    {
                        "decimals": 18,
                        "symbol": "WETH",
                        "name": "Wrapped Ether on Fuse",
                        "chainId": 122,
                        "address": "0xd8Bf72f3e163B9CF0C73dFdCC316417A5ac20670",
                        "tokenInfo": {
                            "name": "Wrapped Ether on Fuse",
                            "address": "0xd8Bf72f3e163B9CF0C73dFdCC316417A5ac20670",
                            "symbol": "WETH",
                            "decimals": 18,
                            "chainId": 122,
                            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
                        },
                        "tags": []
                    },
                    {
                        "decimals": 6,
                        "symbol": "USDC",
                        "name": "USD Coin on Fuse",
                        "chainId": 122,
                        "address": "0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5",
                        "tokenInfo": {
                            "name": "USD Coin on Fuse",
                            "address": "0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5",
                            "symbol": "USDC",
                            "decimals": 6,
                            "chainId": 122,
                            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
                        },
                        "tags": []
                    }
                ],
                "midPrice": {
                    "numerator": [
                        -491531807
                    ],
                    "denominator": [
                        -2070596893,
                        682205361
                    ],
                    "baseCurrency": {
                        "decimals": 18,
                        "symbol": "WETH",
                        "name": "Wrapped Ether on Fuse",
                        "chainId": 122,
                        "address": "0xd8Bf72f3e163B9CF0C73dFdCC316417A5ac20670",
                        "tokenInfo": {
                            "name": "Wrapped Ether on Fuse",
                            "address": "0xd8Bf72f3e163B9CF0C73dFdCC316417A5ac20670",
                            "symbol": "WETH",
                            "decimals": 18,
                            "chainId": 122,
                            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
                        },
                        "tags": []
                    },
                    "quoteCurrency": {
                        "decimals": 6,
                        "symbol": "USDC",
                        "name": "USD Coin on Fuse",
                        "chainId": 122,
                        "address": "0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5",
                        "tokenInfo": {
                            "name": "USD Coin on Fuse",
                            "address": "0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5",
                            "symbol": "USDC",
                            "decimals": 6,
                            "chainId": 122,
                            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
                        },
                        "tags": []
                    },
                    "scalar": {
                        "numerator": [
                            -1486618624,
                            232830643
                        ],
                        "denominator": [
                            1000000
                        ]
                    }
                },
                "input": {
                    "decimals": 18,
                    "symbol": "WETH",
                    "name": "Wrapped Ether on Fuse",
                    "chainId": 122,
                    "address": "0xd8Bf72f3e163B9CF0C73dFdCC316417A5ac20670",
                    "tokenInfo": {
                        "name": "Wrapped Ether on Fuse",
                        "address": "0xd8Bf72f3e163B9CF0C73dFdCC316417A5ac20670",
                        "symbol": "WETH",
                        "decimals": 18,
                        "chainId": 122,
                        "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
                    },
                    "tags": []
                },
                "output": {
                    "decimals": 6,
                    "symbol": "USDC",
                    "name": "USD Coin on Fuse",
                    "chainId": 122,
                    "address": "0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5",
                    "tokenInfo": {
                        "name": "USD Coin on Fuse",
                        "address": "0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5",
                        "symbol": "USDC",
                        "decimals": 6,
                        "chainId": 122,
                        "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
                    },
                    "tags": []
                }
            },
            "tradeType": 0,
            "inputAmount": {
                "numerator": [
                    -1486618624,
                    232830643
                ],
                "denominator": [
                    -1486618624,
                    232830643
                ],
                "currency": {
                    "decimals": 18,
                    "symbol": "WETH",
                    "name": "Wrapped Ether on Fuse",
                    "chainId": 122,
                    "address": "0xd8Bf72f3e163B9CF0C73dFdCC316417A5ac20670",
                    "tokenInfo": {
                        "name": "Wrapped Ether on Fuse",
                        "address": "0xd8Bf72f3e163B9CF0C73dFdCC316417A5ac20670",
                        "symbol": "WETH",
                        "decimals": 18,
                        "chainId": 122,
                        "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
                    },
                    "tags": []
                },
                "token": {
                    "decimals": 18,
                    "symbol": "WETH",
                    "name": "Wrapped Ether on Fuse",
                    "chainId": 122,
                    "address": "0xd8Bf72f3e163B9CF0C73dFdCC316417A5ac20670",
                    "tokenInfo": {
                        "name": "Wrapped Ether on Fuse",
                        "address": "0xd8Bf72f3e163B9CF0C73dFdCC316417A5ac20670",
                        "symbol": "WETH",
                        "decimals": 18,
                        "chainId": 122,
                        "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
                    },
                    "tags": []
                }
            },
            "outputAmount": {
                "numerator": [
                    965616800
                ],
                "denominator": [
                    1000000
                ],
                "currency": {
                    "decimals": 6,
                    "symbol": "USDC",
                    "name": "USD Coin on Fuse",
                    "chainId": 122,
                    "address": "0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5",
                    "tokenInfo": {
                        "name": "USD Coin on Fuse",
                        "address": "0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5",
                        "symbol": "USDC",
                        "decimals": 6,
                        "chainId": 122,
                        "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
                    },
                    "tags": []
                },
                "token": {
                    "decimals": 6,
                    "symbol": "USDC",
                    "name": "USD Coin on Fuse",
                    "chainId": 122,
                    "address": "0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5",
                    "tokenInfo": {
                        "name": "USD Coin on Fuse",
                        "address": "0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5",
                        "symbol": "USDC",
                        "decimals": 6,
                        "chainId": 122,
                        "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
                    },
                    "tags": []
                }
            },
            "executionPrice": {
                "numerator": [
                    965616800
                ],
                "denominator": [
                    -1486618624,
                    232830643
                ],
                "baseCurrency": {
                    "decimals": 18,
                    "symbol": "WETH",
                    "name": "Wrapped Ether on Fuse",
                    "chainId": 122,
                    "address": "0xd8Bf72f3e163B9CF0C73dFdCC316417A5ac20670",
                    "tokenInfo": {
                        "name": "Wrapped Ether on Fuse",
                        "address": "0xd8Bf72f3e163B9CF0C73dFdCC316417A5ac20670",
                        "symbol": "WETH",
                        "decimals": 18,
                        "chainId": 122,
                        "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
                    },
                    "tags": []
                },
                "quoteCurrency": {
                    "decimals": 6,
                    "symbol": "USDC",
                    "name": "USD Coin on Fuse",
                    "chainId": 122,
                    "address": "0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5",
                    "tokenInfo": {
                        "name": "USD Coin on Fuse",
                        "address": "0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5",
                        "symbol": "USDC",
                        "decimals": 6,
                        "chainId": 122,
                        "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
                    },
                    "tags": []
                },
                "scalar": {
                    "numerator": [
                        -1486618624,
                        232830643
                    ],
                    "denominator": [
                        1000000
                    ]
                }
            },
            "nextMidPrice": {
                "numerator": [
                    -1457148607
                ],
                "denominator": [
                    737751779,
                    915036005
                ],
                "baseCurrency": {
                    "decimals": 18,
                    "symbol": "WETH",
                    "name": "Wrapped Ether on Fuse",
                    "chainId": 122,
                    "address": "0xd8Bf72f3e163B9CF0C73dFdCC316417A5ac20670",
                    "tokenInfo": {
                        "name": "Wrapped Ether on Fuse",
                        "address": "0xd8Bf72f3e163B9CF0C73dFdCC316417A5ac20670",
                        "symbol": "WETH",
                        "decimals": 18,
                        "chainId": 122,
                        "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
                    },
                    "tags": []
                },
                "quoteCurrency": {
                    "decimals": 6,
                    "symbol": "USDC",
                    "name": "USD Coin on Fuse",
                    "chainId": 122,
                    "address": "0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5",
                    "tokenInfo": {
                        "name": "USD Coin on Fuse",
                        "address": "0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5",
                        "symbol": "USDC",
                        "decimals": 6,
                        "chainId": 122,
                        "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
                    },
                    "tags": []
                },
                "scalar": {
                    "numerator": [
                        -1486618624,
                        232830643
                    ],
                    "denominator": [
                        1000000
                    ]
                }
            },
            "priceImpact": {
                "numerator": [
                    856059488,
                    1380480455,
                    -336661329,
                    549156708,
                    8387887
                ],
                "denominator": [
                    1479278592,
                    1664736159,
                    977444823,
                    944423004,
                    32750022
                ]
            }
        }
    }
}

 * @apiError {Object} error Object with information about the error
 *
 * @apiErrorExample {json} Error-Response:
 *  {
 *      "error": {
 *          "code": 1,
 *          "message": "Pool is out of liquidity"
 *      }
 * }
 *
 */
router.post('/quote', quoteValidation, SwapController.quote)

export default router
