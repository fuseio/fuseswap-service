<a name="top"></a>
# Fuseswap Backend API v0.1.0

The Fuseswap Backend REST API is used for generating trading data for frontend clients

- [Swap](#Swap)
	- [Create swap parameters for a Trade](#Create-swap-parameters-for-a-Trade)
	- [Create a trade for a token pair](#Create-a-trade-for-a-token-pair)
	

# <a name='Swap'></a> Swap

## <a name='Create-swap-parameters-for-a-Trade'></a> Create swap parameters for a Trade
[Back to top](#top)



```
POST /swap/swapcallparameters
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| currencyIn | `String` | <p>The currency to spend</p> |
| currencyOut | `String` | <p>The desired currency out address</p> |
| inputAmount | `String` | <p>The desired amount to spend</p> |
| recipient | `string` | <p>The address that should receive the output of the swap</p> |
| allowedSlippage | `Number` | **optional**<p>How much the execution price is allowed to move unfavorably from the trade execution price in Basis Points(BIPS)</p>_Default value: 50_<br> |
| ttl | `Number` | **optional**<p>How long the swap is valid until it expires in seconds</p>_Default value: 1200_<br> |

### Success Response
Success-Response:

```
{
     "methodName": "swapExactETHForTokens",
     "args": [
         "0x8f1573df661b2f",
         [
             "0x0BE9e53fd7EDaC9F859882AfdDa116645287C629",
             "0xFaDbBF8Ce7D5b7041bE672561bbA99f79c532e10",
             "0x94Ba7A27c7A95863d1bdC7645AC2951E0cca06bA"
         ],
         "0x5670d7076E7b3604ceb07c003ff0920490756587",
         "0x5fdf7e43"
     ],
     "value": "0xde0b6b3a7640000",
     "rawTxn": {
         "data": "0x7ff36ab5000000000000000000000000000000000000000000000000008f1573df661b2f00000000000000000000000000000000000000000000000000000000000000800000000000000000000000005670d7076e7b3604ceb07c003ff0920490756587000000000000000000000000000000000000000000000000000000005fdf7e4300000000000000000000000000000000000000000000000000000000000000030000000000000000000000000be9e53fd7edac9f859882afdda116645287c629000000000000000000000000fadbbf8ce7d5b7041be672561bba99f79c532e1000000000000000000000000094ba7a27c7a95863d1bdc7645ac2951e0cca06ba",
         "to": "0xFB76e9E7d88E308aB530330eD90e84a952570319",
         "value": {
             "type": "BigNumber",
             "hex": "0x0de0b6b3a7640000"
         }
     }
}
```

### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| methodName | `String` | <p>The method to call on Fuseswap RouterV2</p> |
| args | `String[]` | <p>The arguments to pass to the method, all hex encoded</p> |
| value | `String` | <p>The amount of wei to send in hex</p> |
| rawTxn | `Object` | <p>Unsigned transaction which represents the transaction that needs to be signed and submitted to the network</p> |
## <a name='Create-a-trade-for-a-token-pair'></a> Create a trade for a token pair
[Back to top](#top)



```
POST /swap/trade
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| currencyIn | `String` | <p>The currency to spend</p> |
| currencyOut | `String` | <p>The desired currency out address</p> |
| inputAmount | `String` | <p>The desired amount to spend</p> |

### Success Response
Success-Response:

```

{
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
                            -413243924
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
                            -1644245954,
                            667956554
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
                -413243924
            ],
            "denominator": [
                -1644245954,
                667956554
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
            1001093328
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
            1001093328
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
            -1414337252
        ],
        "denominator": [
            1164102718,
            900787198
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
            731180224,
            -2127546268,
            -2107425010,
            -1492134489,
            8512872
        ],
        "denominator": [
            -1012924416,
            1657637221,
            -1913630915,
            -1080045884,
            32726021
        ]
    }
  }
```

### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| trade | `Object` | <p>The trade object containing information about the <a href="https://uniswap.org/docs/v2/SDK/trade">trade</a> e.g price</p> |
