import { Token } from '@fuseio/fuse-swap-sdk'
import { FUSD, WFUSE } from '.'

export enum TokenType {
  MISC = 'misc',
  LP = 'lp',
  BRIDGED = 'bridged'
}

interface TokenListItem {
    name?: string;
    symbol?: string;
    decimals: number;
    address: string;
    type: TokenType;
}

function getTokenListItem (token: Token): TokenListItem {
  return {
    name: token.name,
    symbol: token.symbol,
    decimals: token.decimals,
    address: token.address,
    type: TokenType.MISC
  }
}

const tokenList: Array<TokenListItem> = [
  getTokenListItem(FUSD),
  getTokenListItem(WFUSE)
]

export default tokenList
