import sinon from 'sinon'
import TokenService from '../../../src/services/token'
import ContractService from '../../../src/services/contract'
import FuseswapGraphService from '../../../src/services/fuseswapGraph'
import BlockGraphService from '../../../src/services/blockGraph'
import HealthGraphService from '../../../src/services/healthGraph'

describe('TokenService', () => {
  let contractService: ContractService
  let fuseswapGraphService: FuseswapGraphService
  let blockGraphService: BlockGraphService
  let healthGraphService: HealthGraphService
  const mockContract = {
    async symbol(...args: any): Promise<any> {},
    async name(...args: any): Promise<any> {},
    async decimals(...args: any): Promise<any> {},
  }

  beforeEach(() => {
    contractService = new ContractService()
    fuseswapGraphService = new FuseswapGraphService()
    blockGraphService = new BlockGraphService()
    healthGraphService = new HealthGraphService()
  })

  describe('getToken', () => {
    test('given address should return token', async () => {
      const tokenService = new TokenService(contractService, fuseswapGraphService, blockGraphService, healthGraphService)

      const token = await tokenService?.getToken(
        '0xa722c13135930332Eb3d749B2F0906559D2C5b99'
      )
      expect(token?.symbol).toBe('WETH')
      expect(token?.name).toBe('Wrapped Ether on Fuse')
      expect(token?.decimals).toBe(18)
    })

    test('given address not in list return token', async () => {
      const mock: any = Object.assign({}, mockContract)
      sinon.stub(mock, 'name').resolves('Moonpay')
      sinon.stub(mock, 'symbol').resolves('MOON')
      sinon.stub(mock, 'decimals').resolves(18)
      sinon.stub(contractService, 'getTokenContract').returns(mock)

      const tokenService = new TokenService(contractService, fuseswapGraphService, blockGraphService, healthGraphService)
      const token = await tokenService?.getToken(
        '0xb9bB65B958EA30752bb4b4745Ab0BEce2Ca9aDB8'
      )

      expect(token?.symbol).toBe('MOON')
      expect(token?.name).toBe('Moonpay')
      expect(token?.decimals).toBe(18)
    })

    test('given FUSE should return currency', async () => {
      const mock: any = Object.assign({}, mockContract)
      sinon.stub(mock, 'name').resolves('FUSE')
      sinon.stub(mock, 'symbol').resolves('Fuse')
      sinon.stub(mock, 'decimals').resolves(18)
      sinon.stub(contractService, 'getTokenContract').returns(mock)

      const tokenService = new TokenService(contractService, fuseswapGraphService, blockGraphService, healthGraphService)
      const token = await tokenService?.getToken('FUSE')

      expect(token?.symbol).toBe('FUSE')
      expect(token?.name).toBe('Fuse')
      expect(token?.decimals).toBe(18)
    })
  })
})
