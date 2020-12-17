import { Token } from '@fuseio/fuse-swap-sdk'
import getToken from '../../../src/utils/token/getToken'

describe('getToken', () => {
  test('given address should return token', async () => {
    const token = await getToken('0xd8Bf72f3e163B9CF0C73dFdCC316417A5ac20670')
    expect(token?.chainId).toBe(122)
    expect(token?.symbol).toBe('WETH')
    expect(token?.name).toBe('Wrapped Ether on Fuse')
    expect(token?.decimals).toBe(18)
  })

  test('given address not in list return token', async () => {
    const token: Token | undefined = await getToken(
      '0xb9bB65B958EA30752bb4b4745Ab0BEce2Ca9aDB8'
    )
    expect(token?.chainId).toBe(122)
    expect(token?.symbol).toBe('MOON')
    expect(token?.name).toBe('Moonpay')
    expect(token?.decimals).toBe(18)
  })
})
