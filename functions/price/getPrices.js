const _ = require('lodash')

const separate = targets => {
  let k = []
  let v = []

  const deep = (obj, stack) => {
    Object.keys(obj).forEach(name => {
      const str = stack ? `${stack}.${name}` : name

      if (obj[name].parse) {
        k.push(str)
        v.push(obj[name])
      } else {
        deep(obj[name], str)
      }
    })
  }

  deep(targets, '')

  return { k, v }
}

const combine = (keys, values) => {
  let obj = {}

  keys.forEach((key, i) => {
    _.set(obj, key, values[i])
  })

  return obj
}

const formatFilters = filters =>
  Object.keys(filters).map(name => ({
    Field: name,
    Type: 'TERM_MATCH',
    Value: filters[name]
  }))

const getPrice = (pricing, service) =>
  new Promise((resolve, reject) => {
    const fetchPrice = (params, arr) => {
      pricing.getProducts(
        {...params, Filters: formatFilters(params.Filters)},
        (err, data) => {
          if (err) {
            return reject(err)
          }

          const { PriceList, NextToken } = data
          const priceLists = arr.concat(PriceList)

          if (NextToken) {
            return fetchPrice(
              {...params, NextToken},
              priceLists
            )
          } else {
            return resolve(service.parse(priceLists))
          }
        }
      )
    }

    fetchPrice(service.params, [])
  })

const getPrices = async (pricing, services) => {
  const kv = separate(services)
  const data = await Promise.all(kv.v.map(v => getPrice(pricing, v)))

  return combine(kv.k, data)
}

module.exports = getPrices
