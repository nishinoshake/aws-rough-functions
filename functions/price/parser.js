const _ = require('lodash')
const { sendWarning } = require('../../lib/slack')

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

  Object.keys(obj).forEach(prefix => {
    if (!options.order.includes(prefix)) {
      sendWarning(`未知機械発見 : ${prefix}`)
    }
  })

  return _.flatten(options.order.map(name => _.sortBy(obj[name], ['price'])))
}

const parseRange = data => {
  const prices = parsePrices(data).map(price => ({
    beginRange: parseInt(price.beginRange, 10),
    endRange: price.endRange === 'Inf' ? null : parseInt(price.endRange, 10),
    price: parseFloat(price.pricePerUnit.USD)
  }))

  return _.sortBy(prices, ['beginRange'])
}

const parsePriceDimensions = data => {
  const { terms: { OnDemand } } = data

  return OnDemand[Object.keys(OnDemand)[0]].priceDimensions
}

const parsePrices = data => {
  const priceDimensions = parsePriceDimensions(data)

  return Object.keys(priceDimensions).map(name => priceDimensions[name])
}

const parseFirstPrice = data => {
  const priceDimensions = parsePriceDimensions(data)

  return parseFloat(
    priceDimensions[Object.keys(priceDimensions)[0]].pricePerUnit.USD
  )
}

module.exports = {
  parseInstances,
  parseRange,
  parsePrices,
  parseFirstPrice
}
