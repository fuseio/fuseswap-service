import { ETHER as FUSE } from '@fuseio/fuse-swap-sdk'
import { FUSE_ADDRESS } from '@constants/index'
import isStringEqual from './isStringEqual'

export default function isFuse (str: string) {
  return isStringEqual(str, FUSE_ADDRESS) || isStringEqual(str, FUSE.symbol ?? '')
}
