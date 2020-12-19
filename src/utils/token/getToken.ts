import getTokens from './getTokens'
import { Token, ETHER as FUSE, Currency } from '@fuseio/fuse-swap-sdk'
import getTokenContract from '../contract/getTokenContract'
import ProviderService from '../../services/provider'
import { CHAIN_ID } from '../../constants'

export default async function getToken(
  tokenAddress: string
): Promise<Currency | undefined> {
  if (!tokenAddress) return

  if (tokenAddress === FUSE.symbol) return FUSE

  const tokens = getTokens()
  const token: Token | undefined = tokens[tokenAddress]

  if (token) {
    return token
  } else {
    const tokenContract = getTokenContract(
      tokenAddress,
      ProviderService.getProvider()
    )

    const name = await tokenContract.callStatic.name()
    const decimals = await tokenContract.callStatic.decimals()
    const symbol = await tokenContract.callStatic.symbol()

    return new Token(CHAIN_ID, tokenAddress, decimals, symbol, name)
  }
}
