import { parsePriceDimensions } from './parsePriceDimensions'

export function parsePrices(priceItem: any): any {
  const priceDimensions = parsePriceDimensions(priceItem)

  return Object.keys(priceDimensions).map(name => priceDimensions[name])
}
