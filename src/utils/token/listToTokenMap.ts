import { ChainId } from '@fuseio/fuse-swap-sdk'
import { TokenList, TokenInfo } from '@uniswap/token-lists'
import WrappedTokenData, { TagInfo } from '@models/wrappedTokenData'

export type TokenAddressMap = Readonly<
  {
    // eslint-disable-next-line no-unused-vars
    [chainId in ChainId]: Readonly<{ [tokenAddress: string]: WrappedTokenData }>
  }
>

export const EMPTY_LIST: TokenAddressMap = {
  [ChainId.KOVAN]: {},
  [ChainId.RINKEBY]: {},
  [ChainId.ROPSTEN]: {},
  [ChainId.GÖRLI]: {},
  [ChainId.MAINNET]: {},
  [ChainId.FUSE]: {}
}

const cache = new WeakMap<TokenList, TokenAddressMap>()

function getTokenTags (list: TokenList, tokenInfo: TokenInfo) {
  return (
    tokenInfo.tags
      ?.map((tagId) => {
        if (!list.tags?.[tagId]) return undefined

        return { ...list.tags[tagId], id: tagId }
      })
      ?.filter((x): x is TagInfo => Boolean(x)) ?? []
  )
}

export function getTokenAddressMap (list: TokenList): TokenAddressMap {
  return list?.tokens.reduce<TokenAddressMap>(
    (tokenMap, tokenInfo) => {
      const tags: TagInfo[] = getTokenTags(list, tokenInfo)
      const token = new WrappedTokenData(tokenInfo, tags)

      if (tokenMap[token.chainId][token.address] !== undefined) {
        throw Error('Duplicate tokens.')
      }

      return {
        ...tokenMap,
        [token.chainId]: {
          ...tokenMap[token.chainId],
          [token.address]: token
        }
      }
    },
    { ...EMPTY_LIST }
  )
}

export default function listToTokenMap (list?: TokenList): TokenAddressMap {
  if (!list) return { ...EMPTY_LIST }

  const cachedList = cache.get(list)

  if (cachedList) return cachedList

  const map = getTokenAddressMap(list)
  cache.set(list, map)
  return map
}
