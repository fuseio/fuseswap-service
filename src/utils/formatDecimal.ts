/**
 * Formats number with a decimal component to the specified decimals
 * without any rounding
 *
 * @param value number to format
 * @param decimals number of decimals to format to
 * @returns The formatted value
 */
export default function formatDecimal (value: string, decimals: number) {
  const [integerComponent, decimalComponent] = value.split('.')
  return decimalComponent ? `${integerComponent}.${decimalComponent.slice(0, decimals)}` : integerComponent
}
