import sinon from 'sinon'
import { BigNumber } from '@ethersproject/bignumber'
import ContractService from '../../../src/services/contract'
import MulticallService from '../../../src/services/multcall'
import { DAI, WFUSE } from '../../../src/constants'
import { abi as IUniswapV2PairABI } from '../../../src/constants/abis/IUniswapV2Pair.json'

describe('MulticallService', () => {
  let contractService: any

  const mockAddresses = [DAI.address, WFUSE.address]
  const mockResults = [
    '0x0000000000000000000000000000000000000000000000000000000021a6e42c0000000000000000000000000000000000000000000000000dead28eb5821aba000000000000000000000000000000000000000000000000000000005fde0314',
    '0x00000000000000000000000000000000000000000000000d010526e52fb497d4000000000000000000000000000000000000000000000000003d1d362a949465000000000000000000000000000000000000000000000000000000005fe0d396',
  ]
  const mockParsedResults = [
    [
      BigNumber.from('0x21a6e42c'),
      BigNumber.from('0x0dead28eb5821aba'),
      1608385300,
    ],
    [
      BigNumber.from('0x0d010526e52fb497d4'),
      BigNumber.from('0x3d1d362a949465'),
      1608569750,
    ],
  ]
  const mockContract = {
    async aggregate(...args: any): Promise<any> {},
  }

  beforeEach(() => {
    contractService = new ContractService()
  })

  test('given params when contract call successful should successfully return results', async () => {
    const mock: any = Object.assign({}, mockContract)
    sinon.stub(mock, 'aggregate').resolves([, mockResults])
    sinon.stub(contractService, 'getMultiCallContract').returns(mock)

    const contract = new MulticallService(contractService)

    const results = await contract.call(
      mockAddresses,
      IUniswapV2PairABI,
      'getReserves'
    )

    expect(JSON.stringify(results)).toBe(JSON.stringify(mockParsedResults))
  })

  test('given params when result contains insuccessful contract calls should successfully return results', async () => {
    const mock: any = Object.assign({}, mockContract)
    sinon.stub(mock, 'aggregate').resolves([, [...mockResults, '0x']])
    sinon.stub(contractService, 'getMultiCallContract').returns(mock)

    const contract = new MulticallService(contractService)

    const results = await contract.call(
      mockAddresses,
      IUniswapV2PairABI,
      'getReserves'
    )

    expect(JSON.stringify(results)).toBe(
      JSON.stringify([...mockParsedResults, null])
    )
  })
})
