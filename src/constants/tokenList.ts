import { Token } from '@fuseio/fuse-swap-sdk'
import { FUSD, WFUSE } from '.'

interface TokenListItem {
    name?: string;
    symbol?: string;
    decimals: number;
    address: string;
}

function getTokenListItem (token: Token): TokenListItem {
  return {
    name: token.name,
    symbol: token.symbol,
    decimals: token.decimals,
    address: token.address
  }
}

const tokenList: Array<TokenListItem> = [
  getTokenListItem(FUSD),
  getTokenListItem(WFUSE)
]

export default tokenList
