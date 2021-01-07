import ProviderService from '../../../src/services/provider'
import { JsonRpcProvider } from '@ethersproject/providers'

describe('ProviderService', () => {
  test('instance is of type JsonRpcProvider', () => {
    expect(ProviderService.getProvider()).toBeInstanceOf(JsonRpcProvider)
  })

  test('instance rpc url should be fuse network url', () => {
    const {
      connection: { url },
    } = ProviderService.getProvider() as JsonRpcProvider
    expect(url).toBe('https://rpc.fuse.io')
  })

  test('creates only one instance', () => {
    expect(ProviderService.getProvider()).toBe(ProviderService.getProvider())
  })
})
