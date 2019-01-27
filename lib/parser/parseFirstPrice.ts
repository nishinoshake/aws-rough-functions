import { parsePriceDimensions } from './parsePriceDimensions'

export function parseFirstPrice(priceItem: any): number {
  const priceDimensions = parsePriceDimensions(priceItem)

  return parseFloat(
    priceDimensions[Object.keys(priceDimensions)[0]].pricePerUnit.USD
  )
}
