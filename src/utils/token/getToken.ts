import getTokens from './getTokens'
import { isAddress } from '@ethersproject/address'
import { Token, ChainId } from '@fuseio/fuse-swap-sdk'
import getTokenContract from '../contract/getTokenContract'
import ProviderService from '../../services/provider'

export default async function getToken(tokenAddress: string): Promise<any> {
  const tokens = getTokens()

  if (!isAddress(tokenAddress) || !tokenAddress) return

  const token: Token | undefined = tokens[tokenAddress]

  if (token) {
    return token
  } else {
    const chainId = ChainId.FUSE
    const tokenContract = getTokenContract(
      tokenAddress,
      ProviderService.getProvider()
    )

    const name = await tokenContract.callStatic.name()
    const decimals = await tokenContract.callStatic.decimals()
    const symbol = await tokenContract.callStatic.symbol()

    return new Token(chainId, tokenAddress, decimals, symbol, name)
  }
}
