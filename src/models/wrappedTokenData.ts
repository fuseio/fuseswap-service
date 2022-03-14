import { Token } from '@voltage-finance/sdk'
import { TokenInfo, Tags } from '@uniswap/token-lists'

type TagDetails = Tags[keyof Tags]

export interface TagInfo extends TagDetails {
  id: string
}

export default class WrappedTokenData extends Token {
  public readonly tokenInfo: TokenInfo
  public readonly tags: TagInfo[]

  constructor (tokenInfo: TokenInfo, tags: TagInfo[]) {
    super(
      tokenInfo.chainId,
      tokenInfo.address,
      tokenInfo.decimals,
      tokenInfo.symbol,
      tokenInfo.name
    )
    this.tokenInfo = tokenInfo
    this.tags = tags
  }
}
