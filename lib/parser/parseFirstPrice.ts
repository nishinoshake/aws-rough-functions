import { parsePriceDimensions } from './parsePriceDimensions'
import { PriceItem } from '../types'

export function parseFirstPrice(priceItem: PriceItem): number {
  const priceDimensions = parsePriceDimensions(priceItem)

  return parseFloat(
    priceDimensions[Object.keys(priceDimensions)[0]].pricePerUnit.USD
  )
}
