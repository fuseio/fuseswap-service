import { Service } from 'typedi'
import { ETHER as FUSE, Token, Currency } from '@fuseio/fuse-swap-sdk'
import getTokens from '@utils/token/getTokens'
import ProviderService from './provider'
import { CHAIN_ID, WFUSE_ADDRESSS } from '@constants/index'
import ContractService from './contract'
import FuseswapGraphService from './fuseswapGraph'
import isZeroAddress from '@utils/isZeroAddress'

@Service()
export default class TokenService {
  constructor (private contractService: ContractService, private fuseswapGraphService: FuseswapGraphService) {}

  async getToken (tokenAddress: string): Promise<Currency | undefined> {
    if (!tokenAddress) return

    if (tokenAddress === FUSE.symbol) return FUSE

    const tokens = getTokens()
    const token: Token | undefined = tokens[tokenAddress]

    if (token) {
      return token
    } else {
      const tokenContract = this.contractService.getTokenContract(
        tokenAddress,
        ProviderService.getProvider()
      )

      const name = await tokenContract.name()
      const decimals = await tokenContract.decimals()
      const symbol = await tokenContract.symbol()

      return new Token(CHAIN_ID, tokenAddress, decimals, symbol, name)
    }
  }

  async getTokenPrice (tokenAddress: string): Promise<number | undefined> {
    // FIXME: Add WFUSE<->ZERO Address mapping to token map
    const address = isZeroAddress(tokenAddress) ? WFUSE_ADDRESSS : tokenAddress
    const price = await this.fuseswapGraphService.getTokenPrice(address)
    return price
  }
}
