import { PriceItem } from '../types'

export function parsePriceDimensions(priceItem: PriceItem): any {
  const {
    terms: { OnDemand }
  } = priceItem

  return OnDemand[Object.keys(OnDemand)[0]].priceDimensions
}
