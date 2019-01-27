import orderBy from 'lodash/orderBy'
import { parseFirstPrice } from './parseFirstPrice'

interface ApiGatewayCache {
  cacheMemorySizeGb: string
  price: number
}

export function parseCache(priceList: any): ApiGatewayCache[] {
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
