import { getAddress } from '@ethersproject/address'

export const buildTokenLogoUri = (address: string) => {
  try {
    const checksummedAddress = getAddress(address)
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${checksummedAddress}/logo.png`
  } catch (e) {
    console.error('Failed to buildTokenLogoUri', e)
  }
}
