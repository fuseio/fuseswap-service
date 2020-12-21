import { ETHER as FUSE } from '@fuseio/fuse-swap-sdk'
import { WFUSE, CHAIN_ID, DAI } from '../../../src/constants'
import wrapCurrency from '../../../src/utils/wrapCurrency'

describe('#wrapCurrency', () => {
  test('given currency when type of currency is fuse and chain is fuse then return WFUSE', () => {
    expect(wrapCurrency(FUSE, CHAIN_ID)).toEqual(WFUSE)
  })

  test('given currency when type of currency is token then return token', () => {
    expect(wrapCurrency(DAI, CHAIN_ID)).toEqual(DAI)
  })
})
