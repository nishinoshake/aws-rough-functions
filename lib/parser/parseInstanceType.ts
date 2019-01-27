import { PriceItem } from '../types'

export function parseInstanceType(priceItem: PriceItem): string {
  return priceItem.product.attributes.instanceType
}
