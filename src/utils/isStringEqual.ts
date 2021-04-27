export default function isStringEqual (stringA: string, stringB: string) {
  return (
    stringA.localeCompare(stringB, undefined, { sensitivity: 'base' }) === 0
  )
}
