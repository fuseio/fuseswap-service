import { Service } from 'typedi'
import tokenList from '@constants/tokenList'
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

    const bridgedTokens = await this.bridgeGraphService.getBridgedTokens()
    const lpTokens = await this.fuseswapGraphService.getLPTokens()

    return list.concat(tokenList).concat(bridgedTokens).concat(lpTokens)
  }
}
