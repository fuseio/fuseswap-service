import multiCall from './multiCall'
import getPairAddresses from './getPairAddresses'
import { Token } from '@fuseio/fuse-swap-sdk'
import { Interface } from '@ethersproject/abi'
import { abi as IUniswapV2Pair } from '../constants/abis/IUniswapV2Pair.json'

export default async function getPairReserves(
  tokens: (Token | undefined)[][]
): Promise<any> {
  const addresses = getPairAddresses(tokens)
  const contractInterface = new Interface(IUniswapV2Pair)
  const reserves = await multiCall(addresses, contractInterface, 'getReserves')
  return reserves
}
