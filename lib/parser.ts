import sortBy from 'lodash/sortBy'
import orderBy from 'lodash/orderBy'
import flatten from 'lodash/flatten'
import * as slack from './notification/slack'

export function parseInstanceType(data) {
  return data.product.attributes.instanceType
}

export function parseInstances(data, options) {
  let obj = {}

  data.forEach(item => {
    const instanceType = parseInstanceType(item)
    const prefix = instanceType.split('.')[options.index]

    if (!obj[prefix]) {
      obj[prefix] = []
    }

    obj[prefix].push({
      price: parseFirstPrice(item),
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

export function parsePriceDimensions(data) {
  const {
    terms: { OnDemand }
  } = data

  return OnDemand[Object.keys(OnDemand)[0]].priceDimensions
}

export function parsePrices(data) {
  const priceDimensions = parsePriceDimensions(data)

  return Object.keys(priceDimensions).map(name => priceDimensions[name])
}

export function parseRange(data) {
  const prices = parsePrices(data).map(price => ({
    beginRange: parseInt(price.beginRange, 10),
    endRange: price.endRange === 'Inf' ? null : parseInt(price.endRange, 10),
    price: parseFloat(price.pricePerUnit.USD)
  }))

  return sortBy(prices, ['beginRange'])
}

export function parseFirstPrice(data) {
  const priceDimensions = parsePriceDimensions(data)

  return parseFloat(
    priceDimensions[Object.keys(priceDimensions)[0]].pricePerUnit.USD
  )
}

export function parseCache(data) {
  const items = data.map(item => ({
    cacheMemorySizeGb: parseFloat(item.product.attributes.cacheMemorySizeGb),
    price: parseFirstPrice(item)
  }))

  return orderBy(items, ['cacheMemorySizeGb'], ['asc']).map(
    ({ cacheMemorySizeGb, price }) => ({
      cacheMemorySizeGb: cacheMemorySizeGb.toString(),
      price
    })
  )
}
