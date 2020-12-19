import { Token, ChainId, WETH as WFUSE_MAP, JSBI } from '@fuseio/fuse-swap-sdk'

export const CHAIN_ID = 122

export const MULTICALL_ADDRESS = '0x3CE6158b7278Bf6792e014FA7B4f3c6c46fe9410'
// 20 minutes from now in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

export const INITIAL_ALLOWED_SLIPPAGE = 50

export const BIPS_BASE = JSBI.BigInt(10000)

export const WFUSE = WFUSE_MAP[CHAIN_ID]

export const DAI = new Token(
  CHAIN_ID,
  '0x94Ba7A27c7A95863d1bdC7645AC2951E0cca06bA',
  18,
  'DAI',
  'Dai Stablecoin on Fuse'
)
export const USDC = new Token(
  CHAIN_ID,
  '0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5',
  6,
  'USDC',
  'USD Coin on Fuse'
)
export const USDT = new Token(
  CHAIN_ID,
  '0xFaDbBF8Ce7D5b7041bE672561bbA99f79c532e10',
  6,
  'USDT',
  'Tether USD on Fuse'
)
export const WBTC = new Token(
  CHAIN_ID,
  '0x33284f95ccb7B948d9D352e1439561CF83d8d00d',
  8,
  'WBTC',
  'Wrapped BTC on Fuse'
)
export const WETH = new Token(
  CHAIN_ID,
  '0xd8Bf72f3e163B9CF0C73dFdCC316417A5ac20670',
  18,
  'WETH',
  'Wrapped Ether on Fuse'
)

export const BASES_TO_CHECK_TRADES_AGAINST = {
  [ChainId.FUSE]: [WFUSE, DAI, USDC, USDT, WBTC, WETH],
}
