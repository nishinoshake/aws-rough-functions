import { parsePriceDimensions } from './index'
import { PriceItem } from '@/lib/types'

export function parsePrices(priceItem: PriceItem): any {
  const priceDimensions = parsePriceDimensions(priceItem)

  return Object.keys(priceDimensions).map(name => priceDimensions[name])
}
