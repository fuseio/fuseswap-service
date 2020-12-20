import { JsonRpcProvider, Provider } from '@ethersproject/providers'
import config from 'config'

export default class ProviderService {
  private static instance: Provider

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getProvider(): Provider {
    if (!ProviderService.instance) {
      ProviderService.instance = new JsonRpcProvider(config.get('rpcUrl'))
    }

    return ProviderService.instance
  }
}
