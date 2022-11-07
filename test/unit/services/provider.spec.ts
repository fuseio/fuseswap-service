import ProviderService from '../../../src/services/provider'
import { JsonRpcProvider } from '@ethersproject/providers'

describe('ProviderService', () => {
  test('instance is of type JsonRpcProvider', () => {
    expect(ProviderService.getProvider()).toBeInstanceOf(JsonRpcProvider)
  })

  test('creates only one instance', () => {
    expect(ProviderService.getProvider()).toBe(ProviderService.getProvider())
  })
})
