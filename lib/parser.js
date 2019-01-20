const _ = require('lodash')
const slack = require('./notification/slack')

const parseInstanceType = data => {
  return data.product.attributes.instanceType
}

const parseInstances = (data, options) => {
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
      slack.sendWarning(
        `${options.name} => 未知のインスタンスを発見 : ${prefix}`
      )
      throw new Error('未知のインスタンスを発見')
    }
  })

  // 過去のインスタンス
  options.order.forEach(prefix => {
    if (!prefixes.includes(prefix)) {
      slack.sendWarning(
        `${
          options.name
        } => このインスタンスは過去のものになったみたいです : ${prefix}`
      )
      throw new Error('このインスタンスは過去のものになったみたいです')
    }
  })

  return _.flatten(options.order.map(name => _.sortBy(obj[name], ['price'])))
}

const parsePriceDimensions = data => {
  const {
    terms: { OnDemand }
  } = data

  return OnDemand[Object.keys(OnDemand)[0]].priceDimensions
}

const parsePrices = data => {
  const priceDimensions = parsePriceDimensions(data)

  return Object.keys(priceDimensions).map(name => priceDimensions[name])
}

const parseRange = data => {
  const prices = parsePrices(data).map(price => ({
    beginRange: parseInt(price.beginRange, 10),
    endRange: price.endRange === 'Inf' ? null : parseInt(price.endRange, 10),
    price: parseFloat(price.pricePerUnit.USD)
  }))

  return _.sortBy(prices, ['beginRange'])
}

const parseFirstPrice = data => {
  const priceDimensions = parsePriceDimensions(data)

  return parseFloat(
    priceDimensions[Object.keys(priceDimensions)[0]].pricePerUnit.USD
  )
}

const parseCache = data => {
  const items = data.map(item => ({
    cacheMemorySizeGb: parseFloat(item.product.attributes.cacheMemorySizeGb),
    price: parseFirstPrice(item)
  }))

  return _.orderBy(items, ['cacheMemorySizeGb'], ['asc']).map(
    ({ cacheMemorySizeGb, price }) => ({
      cacheMemorySizeGb: cacheMemorySizeGb.toString(),
      price
    })
  )
}

module.exports = {
  parseInstanceType,
  parseInstances,
  parsePriceDimensions,
  parseRange,
  parsePrices,
  parseFirstPrice,
  parseCache
}
