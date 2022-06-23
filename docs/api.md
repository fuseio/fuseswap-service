<a name="top"></a>
# Fuseswap Backend API v0.1.0

The Fuseswap Backend REST API is used for generating trading data for frontend clients

# Table of contents

- [Price](#Price)
  - [Get latest price for a token](#Get-latest-price-for-a-token)
- [PriceChange](#PriceChange)
  - [Get price change for token over last 24 hours](#Get-price-change-for-token-over-last-24-hours)
  - [Get price change for token over time duration](#Get-price-change-for-token-over-time-duration)
- [PriceChangeInterval](#PriceChangeInterval)
  - [Get price changes over an interval for token](#Get-price-changes-over-an-interval-for-token)
- [Stats](#Stats)
  - [Get historical statistics of the token](#Get-historical-statistics-of-the-token)
- [Swap](#Swap)
  - [Create a quote for a token pair](#Create-a-quote-for-a-token-pair)
  - [Create swap parameters for a Trade](#Create-swap-parameters-for-a-Trade)
- [Tokens](#Tokens)
  - [Returns a list of tokens on fuse](#Returns-a-list-of-tokens-on-fuse)

___


# <a name='Price'></a> Price

## <a name='Get-latest-price-for-a-token'></a> Get latest price for a token
[Back to top](#top)

```
GET /api/v1/price/:tokenAddress
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| tokenAddress | `String` | <p>The currency address</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| price | `Number` | <p>The price of the token</p> |

### Success response example

#### Success response example - `Success-Response:`

```json

{
 "data": {
     "price":1.009884197756788
  }
}
```

# <a name='PriceChange'></a> PriceChange

## <a name='Get-price-change-for-token-over-last-24-hours'></a> Get price change for token over last 24 hours
[Back to top](#top)

```
GET /api/v1/pricechange/:tokenAddress
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| tokenAddress | `String` | <p>The currency address</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| priceChange | `String` | <p>The price change ratio of the token</p> |
| currentPrice | `String` | <p>The current price of the token</p> |
| previousPrice | `String` | <p>The previous price of the token</p> |

### Success response example

#### Success response example - `Success-Response:`

```json

{
    "data": {
        "priceChange": "4.761727644165598",
        "currentPrice": "3760.8426158182515",
        "previousPrice": "3589.901293526158"
    }
}
```

## <a name='Get-price-change-for-token-over-time-duration'></a> Get price change for token over time duration
[Back to top](#top)

```
POST /api/v1/pricechange/:tokenAddress
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| tokenAddress | `String` | <p>The currency address</p> |

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| duration | `Object` | <p>The duration object to calculate the price change over the timeFrame duration should be passed as an object according to https://day.js.org/docs/en/durations/creating for example duration of {days: 1} means a duration of one day</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| priceChange | `String` | <p>The price change ratio of the token</p> |
| currentPrice | `String` | <p>The current price of the token</p> |
| previousPrice | `Object` | <p>The previous price of the token</p> |

### Success response example

#### Success response example - `Success-Response:`

```json

{
    "data": {
        "priceChange": "4.761727644165598",
        "currentPrice": "3760.8426158182515",
        "previousPrice": "3589.901293526158"
    }
}
```

# <a name='PriceChangeInterval'></a> PriceChangeInterval

## <a name='Get-price-changes-over-an-interval-for-token'></a> Get price changes over an interval for token
[Back to top](#top)

```
GET /api/v1/pricechange/interval/:timeFrame/:tokenAddress
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| tokenAddress | `String` | <p>The address of the token</p> |
| timeFrame | `string` | <p>How far to look back</p>_Allowed values: "ALL","MONTH","WEEK","DAY","HOUR"_ |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| priceChanges | `Object[]` | <p>List of price changes</p> |
| priceChanges.timestamp | `Number` | <p>The time in seconds at which the price change occurred</p> |
| priceChanges.priceChange | `Number` | <p>The price change ratio of the token at the specified timestamp</p> |
| priceChanges.previousPrice | `Number` | <p>The previous price at the specified timestamp</p> |
| priceChanges.price | `Number` | <p>The price at the specified timestamp</p> |

### Success response example

#### Success response example - `Success-Response:`

```json

 {
   "data": [
     {
       "timestamp": 1628542800,
       "priceChange": 0,
       "previousPrice": "43935.339297872226",
       "currentPrice": "43935.339297872226"
     }
   ]
}
```

# <a name='Stats'></a> Stats

## <a name='Get-historical-statistics-of-the-token'></a> Get historical statistics of the token
[Back to top](#top)

```
GET /api/v1/stats/:tokenAddress
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| tokenAddress | `String` | <p>The currency address</p> |

### Query Parameters

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| limit | `String` | <p>The number of days to return statistics for</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| array | `Object[]` | <p>of token stats objects, see example below</p> |

### Success response example

#### Success response example - `Success-Response:`

```json

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

# <a name='Swap'></a> Swap

## <a name='Create-a-quote-for-a-token-pair'></a> Create a quote for a token pair
[Back to top](#top)

```
POST /api/v1/swap/quote
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| currencyIn | `String` | <p>The currency to spend</p> |
| currencyOut | `String` | <p>The desired currency out address</p> |
| amountIn | `String` | <p>The desired amount to spend</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| info | `Object` | <p>Simplied quote object containing information about the trade</p> |
| trade | `Object` | <p>The trade object containing information about the <a href="https://uniswap.org/docs/v2/SDK/trade">trade</a> e.g price</p> |

### Success response example

#### Success response example - `Success-Response:`

```json

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

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| error | `Object` | <p>Object with information about the error</p> |

### Error response example

#### Error response example - `Error-Response:`

```json
 {
     "error": {
         "code": 1,
         "message": "Pool is out of liquidity"
     }
}
```

## <a name='Create-swap-parameters-for-a-Trade'></a> Create swap parameters for a Trade
[Back to top](#top)

```
POST /api/v1/swap/requestparameters
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| currencyIn | `String` | <p>The currency to spend</p> |
| currencyOut | `String` | <p>The desired currency out address</p> |
| inputAmount | `String` | <p>The desired amount to spend</p> |
| recipient | `string` | <p>The address that should receive the output of the swap</p> |
| allowedSlippage | `Number` | **optional** <p>How much the execution price is allowed to move unfavorably from the trade execution price in Basis Points(BIPS)</p>_Default value: 50_<br> |
| ttl | `Number` | **optional** <p>How long the swap is valid until it expires in seconds</p>_Default value: 1200_<br> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| methodName | `String` | <p>The method to call on Fuseswap RouterV2</p> |
| args | `String[]` | <p>The arguments to pass to the method, all hex encoded</p> |
| value | `String` | <p>The amount of wei to send in hex</p> |
| rawTxn | `Object` | <p>Unsigned transaction which represents the transaction that needs to be signed and submitted to the network</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
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

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| error | `Object` | <p>Object with information about the error</p> |

### Error response example

#### Error response example - `Error-Response:`

```json
 {
     "error": {
         "code": 1,
         "message": "Pool is out of liquidity"
     }
}
```

# <a name='Tokens'></a> Tokens

## <a name='Returns-a-list-of-tokens-on-fuse'></a> Returns a list of tokens on fuse
[Back to top](#top)

```
GET /api/v1/tokens
```
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| tokens | `Object[]` | <p>List of tokens</p> |
| tokens.name | `String` | <p>The name of the token</p> |
| tokens.symbol | `String` | <p>The symbol of the token</p> |
| tokens.decimals | `Number` | <p>The number of decimals the token</p> |
| tokens.address | `String` | <p>The address of the token on fuse network</p> |
| tokens.underlyingTokens | `Object[]` | **optional**<p>[lp only] The list of underlying tokens for the lp token type</p> |
| token.underlyingTokens.address | `String` | **optional**<p>[lp only] The address of the underlying token</p> |
| token.underlyingTokens.name | `String` | **optional**<p>[lp only] The name of the underlying token</p> |
| token.underlyingToken.symbol | `String` | **optional**<p>[lp only] The symbol of the underlying token</p> |
| tokens.logoURI | `String` | **optional**<p>The logo url for the token</p> |
| tokens.type | `String` | <p>The type of token</p>_Allowed values: "misc","bridged","lp"_ |

### Success response example

#### Success response example - `Success-Response`

```json

{
   "data": {
     "tokens": [
         {
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
     ]
   }
}
```

