import { FUSD, WFUSE } from './index'

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
  logoURI: string;
}

const tokenList: Array<TokenListItem> = [
  {
    name: FUSD.name,
    symbol: FUSD.symbol,
    decimals: FUSD.decimals,
    address: FUSD.address,
    logoURI: 'https://fuselogo.s3.eu-central-1.amazonaws.com/fuse-dollar.png',
    type: TokenType.MISC
  },
  {
    name: WFUSE.name,
    symbol: WFUSE.symbol,
    decimals: WFUSE.decimals,
    address: WFUSE.address,
    logoURI: 'https://fuselogo.s3.eu-central-1.amazonaws.com/wfuse.png',
    type: TokenType.MISC
  }
]

export default tokenList
