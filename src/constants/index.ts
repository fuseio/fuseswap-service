import { Token, ChainId, WETH as WFUSE_MAP, JSBI, Percent } from '@voltage-finance/sdk'
import { getAddress } from '@ethersproject/address'

export const VOLTAGE_DEPLOYMENT_TIMESTAMP = 1645617935

export const CHAIN_ID = 122

export const CNS_TOKEN_ADDRESS = '0xc2e299b47398963c618de5b05c6bdecd4cc64022'

export const ROUTER_ADDRESS = '0xE3F85aAd0c8DD7337427B9dF5d0fB741d65EEEB5'

export const PEGSWAP_ADDRESS = '0xdfE016328E7BcD6FA06614fE3AF3877E931F7e0a'

export const PEGSWAP_V2_ADDRESS = '0x56eE525bB9056BeD23A6055E60b2A2C5C225D1db'

export const MULTI_CALL_ADDRESS = '0x3CE6158b7278Bf6792e014FA7B4f3c6c46fe9410'
// 20 minutes from now in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

export const INITIAL_ALLOWED_SLIPPAGE = 50

export const BIPS_BASE = JSBI.BigInt(10000)

export const FEE_TOKEN_SLIPPAGE = 2100

export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(FEE_TOKEN_SLIPPAGE), BIPS_BASE)

export const BUNDLE_ID = 1

export const WFUSE = WFUSE_MAP[CHAIN_ID]

export const WFUSE_ADDRESS = WFUSE.address

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const NATIVE_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'

export const FUSE_ADDRESS = NATIVE_ADDRESS

// lowercased token addresses
export const FUSD_ADDRESS = '0x249be57637d8b013ad64785404b24aebae9b098b'
export const USDC_ADDRESS = '0x620fd5fa44be6af63715ef4e65ddfa0387ad13f5'
export const USDT_ADDRESS = '0xfadbbf8ce7d5b7041be672561bba99f79c532e10'
export const WBTC_ADDRESS = '0x33284f95ccb7b948d9d352e1439561cf83d8d00d'
export const WETH_ADDRESS = '0xa722c13135930332eb3d749b2f0906559d2c5b99'
export const DAI_ADDRESS = '0x94ba7a27c7a95863d1bdc7645ac2951e0cca06ba'
export const XVOLT_ADDRESS = '0x97a6e78c9208c21afada67e7e61d7ad27688efd1'
export const VOLT_ADDRESS = '0x34ef2cc892a88415e9f02b91bfa9c91fc0be6bd4'
export const SFUSE_ADDRESS = '0xb1dd0b683d9a56525cc096fbf5eec6e60fe79871'
export const USDC_V2_ADDRESS = '0x28c3d1cd466ba22f6cae51b1a4692a831696391a'
export const WETH_V2_ADDRESS = '0x5622f6dc93e08a8b717b149677930c38d5d50682'

export const DAI = new Token(
  CHAIN_ID,
  getAddress(DAI_ADDRESS),
  18,
  'DAI',
  'Dai Stablecoin on Fuse'
)
export const USDC = new Token(
  CHAIN_ID,
  getAddress(USDC_ADDRESS),
  6,
  'USDC',
  'USD Coin on Fuse'
)
export const USDCV2 = new Token(
  CHAIN_ID,
  getAddress(USDC_V2_ADDRESS),
  6,
  'USDC',
  'USD Coin on Fuse'
)
export const USDT = new Token(
  CHAIN_ID,
  getAddress(USDT_ADDRESS),
  6,
  'USDT',
  'Tether USD on Fuse'
)
export const WBTC = new Token(
  CHAIN_ID,
  getAddress(WBTC_ADDRESS),
  8,
  'WBTC',
  'Wrapped BTC on Fuse'
)
export const WETH = new Token(
  CHAIN_ID,
  getAddress(WETH_ADDRESS),
  18,
  'WETH',
  'Wrapped Ether on Fuse'
)
export const WETHV2 = new Token(
  CHAIN_ID,
  getAddress(WETH_V2_ADDRESS),
  18,
  'WETHV2',
  'Wrapped Ether'
)

export const FUSD = new Token(
  CHAIN_ID,
  getAddress(FUSD_ADDRESS),
  18,
  'fUSD',
  'Fuse Dollar'
)

export const BASES_TO_CHECK_TRADES_AGAINST = {
  [ChainId.FUSE]: [WFUSE, USDC, USDT, WBTC, WETH]
}

export const TOKEN_MAP = {
  [FUSE_ADDRESS]: WFUSE_ADDRESS
}

export const FEE_TOKENS = [CNS_TOKEN_ADDRESS]
