import orderBy from 'lodash/orderBy'
import { parseFirstPrice } from './parseFirstPrice'
import { ApiGatewayCache, PriceItem } from '../types'

export function parseCache(priceList: PriceItem[]): ApiGatewayCache[] {
  const formattedPriceList = priceList.map(priceItem => ({
    cacheMemorySizeGb: parseFloat(
      priceItem.product.attributes.cacheMemorySizeGb
    ),
    price: parseFirstPrice(priceItem)
  }))

  return orderBy(formattedPriceList, ['cacheMemorySizeGb'], ['asc']).map(
    ({ cacheMemorySizeGb, price }) => ({
      cacheMemorySizeGb: cacheMemorySizeGb.toString(),
      price
    })
  )
}
