import {
  Currency,
  ChainId,
  ETHER as FUSE,
  WETH,
  Token
} from '@fuseio/fuse-swap-sdk'

export default function wrapCurrency (
  currency: Currency,
  chainId: ChainId
): Token | undefined {
  return chainId && currency === FUSE
    ? WETH[chainId]
    : currency instanceof Token
      ? currency
      : undefined
}
