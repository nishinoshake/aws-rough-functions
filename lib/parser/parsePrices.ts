import { parsePriceDimensions } from './parsePriceDimensions'
import { PriceItem } from '../types'

export function parsePrices(priceItem: PriceItem): any {
  const priceDimensions = parsePriceDimensions(priceItem)

  return Object.keys(priceDimensions).map(name => priceDimensions[name])
}
