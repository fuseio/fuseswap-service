import {
  BASES_TO_CHECK_TRADES_AGAINST,
  CHAIN_ID,
  DAI,
  WFUSE,
} from '../../../src/constants'
import PairService from '../../../src/services/pair'
import MulticallService from '../../../src/services/multcall'
import ContractService from '../../../src/services/contract'
import BASE_PAIRS from '../../constants/basePair.json'

describe('PairService', () => {
  let multicallService: MulticallService

  beforeEach(() => {
    const contractService = new ContractService()
    multicallService = new MulticallService(contractService)
  })

  describe('#getBases', () => {
    test('given no params when called then return bases to trades against', () => {
      const service = new PairService(multicallService)
      expect(service.getBases()).toEqual(
        BASES_TO_CHECK_TRADES_AGAINST[CHAIN_ID]
      )
    })
  })

  describe('#getBasePairs', () => {
    test('given no params when called then return base pairs', () => {
      const service = new PairService(multicallService)
      expect(service.getBasePairs()).toEqual(BASE_PAIRS)
    })
  })

  describe('#getPairAddresses', () => {
    test('given tokens then return Pair addresses for tokens', () => {
      const service = new PairService(multicallService)
      expect(service.getPairAddresses([[DAI, WFUSE]])).toEqual([
        '0x7E6e52B4CB8320e63E30ee9D5c8752474E5A9627'
      ])
    })
  })
})
