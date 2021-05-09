<a name="top"></a>
# Fuseswap Backend API v0.1.0

The Fuseswap Backend REST API is used for generating trading data for frontend clients

- [PriceChange](#PriceChange)
	- [Get price change for token over last 24 hours](#Get-price-change-for-token-over-last-24-hours)
	- [Get price change stats of the token](#Get-price-change-stats-of-the-token)
	- [Get price change for token over time duration](#Get-price-change-for-token-over-time-duration)
	
- [Price](#Price)
	- [Get latest price for a token](#Get-latest-price-for-a-token)
	
- [Stats](#Stats)
	- [Get historical statistics of the token](#Get-historical-statistics-of-the-token)
	
- [Swap](#Swap)
	- [Create a quote for a token pair](#Create-a-quote-for-a-token-pair)
	- [Create swap parameters for a Trade](#Create-swap-parameters-for-a-Trade)
	

# <a name='PriceChange'></a> PriceChange

## <a name='Get-price-change-for-token-over-last-24-hours'></a> Get price change for token over last 24 hours
[Back to top](#top)



```
GET /pricechange
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| tokenAddress | `String` | <p>The currency address</p> |

### Success Response
Success-Response:

```

{
    "data": {
        "priceChange": "4.761727644165598",
        "currentPrice": "3760.8426158182515",
        "previousPrice": "3589.901293526158"
    }
}
```

### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| priceChange | `String` | <p>The price change ratio of the token</p> |
| currentPrice | `String` | <p>The current price of the token</p> |
| previousPrice | `String` | <p>The previous price of the token</p> |
## <a name='Get-price-change-stats-of-the-token'></a> Get price change stats of the token
[Back to top](#top)



```
GET /pricechange
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| tokenAddress | `String` | <p>The currency address</p> |

### Success Response
Success-Response:

```

{
    "data": {
        "priceChange": "-0.0007561320055728409",
        "currentPrice": "2507.7926905931677",
        "openingStat": [
            {
                "address": "0xa722c13135930332eb3d749b2f0906559d2c5b99",
                "price": "2509.690347789208280724433142784366",
                "volume": "2681.774272338948506536539339084855",
                "timestamp": 1619481600,
                "date": "2021-04-27T00:00:00.000Z"
            }
        ]
    }
}
```

### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| priceChange | `String` | <p>The price change ratio of the token</p> |
| currentPrice | `String` | <p>The current price of the token</p> |
| previousPrice | `String` | <p>The previous price of the token</p> |
## <a name='Get-price-change-for-token-over-time-duration'></a> Get price change for token over time duration
[Back to top](#top)



```
POST /pricechange
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| tokenAddress | `String` | <p>The currency address</p> |
| duration | `Object` | <p>The duration object to calculate the price change over the timeframe duration should be passed as an object according to https://day.js.org/docs/en/durations/creating for example duration of {days: 1} means a duration of one day</p> |

### Success Response
Success-Response:

```

{
    "data": {
        "priceChange": "4.761727644165598",
        "currentPrice": "3760.8426158182515",
        "previousPrice": "3589.901293526158"
    }
}
```

### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| priceChange | `String` | <p>The price change ratio of the token</p> |
| currentPrice | `String` | <p>The current price of the token</p> |
| previousPrice | `Object` | <p>The previous price of the token</p> |
# <a name='Price'></a> Price

## <a name='Get-latest-price-for-a-token'></a> Get latest price for a token
[Back to top](#top)



```
GET /price
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| tokenAddress | `String` | <p>The currency address</p> |

### Success Response
Success-Response:

```

{
 "data": {
     "price":1.009884197756788
  }
}
```

### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| price | `Number` | <p>The price of the token</p> |
# <a name='Stats'></a> Stats

## <a name='Get-historical-statistics-of-the-token'></a> Get historical statistics of the token
[Back to top](#top)



```
GET /stats/:tokenAddress?=limit={limit}
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| tokenAddress | `String` | <p>The currency address</p> |
| limit | `String` | <p>The number of days to return statistics for (query param)</p> |

### Success Response
Success-Response:

```

{
 "data": [
      {
          "address": "0xa722c13135930332eb3d749b2f0906559d2c5b99",
          "price": "2389.74779405372110747871079158035",
          "volume": "3343.67560523501352604818272285103",
          "timestamp": 1619395200,
          "date": "2021-04-26T00:00:00.000Z"
      }
]
```

### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| array | `Object[]` | <p>of token stats objects, see example below</p> |
# <a name='Swap'></a> Swap

## <a name='Create-a-quote-for-a-token-pair'></a> Create a quote for a token pair
[Back to top](#top)



```
POST /swap/quote
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
```

### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| info | `Object` | <p>Simplied quote object containing information about the trade</p> |
| trade | `Object` | <p>The trade object containing information about the <a href="https://uniswap.org/docs/v2/SDK/trade">trade</a> e.g price</p> |
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
