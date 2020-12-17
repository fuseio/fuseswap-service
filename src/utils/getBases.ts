import { Token } from '@fuseio/fuse-swap-sdk'
import { BASES_TO_CHECK_TRADES_AGAINST, CHAIN_ID } from '../constants'

export default function getBases(): Token[] {
  return BASES_TO_CHECK_TRADES_AGAINST[CHAIN_ID]
}
