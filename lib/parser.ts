import sortBy from 'lodash/sortBy'
import orderBy from 'lodash/orderBy'
import flatten from 'lodash/flatten'
import * as slack from './notification/slack'

export function parseInstanceType(data: any): string {
  return data.product.attributes.instanceType
}

interface InstanceOptions {
  name: string
  index: number
  order: string[]
}

interface ParsedInstance {
  price: number
  instanceType: string
}

export function parseInstances(
  priceList: any,
  options: InstanceOptions
): ParsedInstance[] {
  let obj = {}

  priceList.forEach(priceItem => {
    const instanceType = parseInstanceType(priceItem)
    const prefix = instanceType.split('.')[options.index]

    if (!obj[prefix]) {
      obj[prefix] = []
    }

    obj[prefix].push({
      price: parseFirstPrice(priceItem),
      instanceType
    })
  })

  const prefixes = Object.keys(obj)

  // 未知のインスタンス
  prefixes.forEach(prefix => {
    if (!options.order.includes(prefix)) {
      // tslint:disable-next-line:no-floating-promises
      slack.sendWarning(
        `${options.name} => 未知のインスタンスを発見 : ${prefix}`
      )
      throw new Error('未知のインスタンスを発見')
    }
  })

  // 過去のインスタンス
  options.order.forEach(prefix => {
    if (!prefixes.includes(prefix)) {
      // tslint:disable-next-line:no-floating-promises
      slack.sendWarning(
        `${
          options.name
        } => このインスタンスは過去のものになったみたいです : ${prefix}`
      )
      throw new Error('このインスタンスは過去のものになったみたいです')
    }
  })

  return flatten(options.order.map(name => sortBy(obj[name], ['price'])))
}

export function parsePriceDimensions(priceItem: any): any {
  const {
    terms: { OnDemand }
  } = priceItem

  return OnDemand[Object.keys(OnDemand)[0]].priceDimensions
}

export function parsePrices(priceItem: any): any {
  const priceDimensions = parsePriceDimensions(priceItem)

  return Object.keys(priceDimensions).map(name => priceDimensions[name])
}

interface PriceRange {
  beginRange: number
  endRange: number | null
  price: number
}

export function parseRange(priceItem: any): PriceRange[] {
  const prices = parsePrices(priceItem).map(price => ({
    beginRange: parseInt(price.beginRange, 10),
    endRange: price.endRange === 'Inf' ? null : parseInt(price.endRange, 10),
    price: parseFloat(price.pricePerUnit.USD)
  }))

  return sortBy(prices, ['beginRange'])
}

export function parseFirstPrice(priceItem: any): number {
  const priceDimensions = parsePriceDimensions(priceItem)

  return parseFloat(
    priceDimensions[Object.keys(priceDimensions)[0]].pricePerUnit.USD
  )
}

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
