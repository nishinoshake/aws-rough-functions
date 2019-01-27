import orderBy from 'lodash/orderBy'
import { ApiGatewayCache, PriceItem } from '@/lib/types'
import { parseFirstPrice } from './index'

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
