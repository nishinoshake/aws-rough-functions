import { PriceItem } from '@/lib/types'
import { parsePriceDimensions } from './index'

export function parseFirstPrice(priceItem: PriceItem): number {
  const priceDimensions = parsePriceDimensions(priceItem)

  return parseFloat(
    priceDimensions[Object.keys(priceDimensions)[0]].pricePerUnit.USD
  )
}
