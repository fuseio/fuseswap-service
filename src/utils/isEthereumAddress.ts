const regex = /^(0x)[0-9a-f]{40}$/i

export default function isEthereumAddress (str: string) {
  return regex.test(str)
}
