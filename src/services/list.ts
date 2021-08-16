import { Service } from 'typedi'
import tokenList, { TokenType } from '@constants/tokenList'
import BridgeGraphService from './bridgeGraph'
import FuseswapGraphService from './fuseswapGraph'

@Service()
export default class ListService {
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
        token0: pair.token0.id,
        token1: pair.token1.id,
        type: TokenType.LP
      }
    })
  }

  async getBridgedTokens () {
    const tokens = await this.bridgeGraphService.getBridgedTokens()
    return tokens.map((token: any) => ({
      ...token,
      type: TokenType.BRIDGED
    }))
  }
}
