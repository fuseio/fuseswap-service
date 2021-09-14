import { Service } from 'typedi'
import tokenList, { TokenType } from '@constants/tokenList'
import BridgeGraphService from './bridgeGraph'
import FuseswapGraphService from './fuseswapGraph'
import { buildTokenLogoUri } from '@utils/index'

@Service()
export default class TokensService {
  constructor (
    private bridgeGraphService: BridgeGraphService,
    private fuseswapGraphService: FuseswapGraphService
  ) {}

  async getTokenList () {
    const list: Array<any> = []

    const bridgedTokens = await this.getBridgedTokens()
    const lpTokens = await this.getLPTokens()

    return list.concat(tokenList)
      .concat(bridgedTokens)
      .concat(lpTokens)
  }

  async getLPTokens () {
    const tokens = await this.fuseswapGraphService.getLPTokens()
    return tokens.map((pair: any) => {
      const symbol = `${pair.token0.symbol}-${pair.token1.symbol}`

      return {
        address: pair.id,
        name: `FuseSwap ${symbol}`,
        symbol: `FS ${symbol}`,
        decimals: 18,
        underlyingTokens: [
          {
            address: pair.token0.id,
            name: pair.token0.name,
            symbol: pair.token0.symbol
          },
          {
            address: pair.token1.id,
            name: pair.token1.name,
            symbol: pair.token1.symbol
          }
        ],
        type: TokenType.LP
      }
    })
  }

  async getBridgedTokens () {
    const tokens = await this.bridgeGraphService.getBridgedTokens()
    return tokens.map((token: any) => ({
      ...token,
      logoURI: buildTokenLogoUri(token.foreignAddress),
      type: TokenType.BRIDGED
    }))
  }
}
