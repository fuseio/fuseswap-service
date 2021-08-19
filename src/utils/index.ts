import { getAddress } from '@ethersproject/address'

export const buildTokenLogoUri = (address: string) => {
  try {
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${getAddress(address)}/logo.png`
  } catch (e) {
    console.error('Failed to buildTokenLogoUri', e)
  }
}
