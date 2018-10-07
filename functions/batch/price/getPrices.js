const fs = require('fs')
const _ = require('lodash')
const { IS_LOCAL } = process.env

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
            if (IS_LOCAL) {
              fs.writeFileSync(`${__dirname}/../../../json/${params.ServiceCode}.json`, JSON.stringify(priceLists))
            }
            return resolve(service.parse(priceLists))
          }
        }
      )
    }

    fetchPrice(service.params, [])
  })

const wait = timeout => new Promise(resolve => {
  setTimeout(() => {
    resolve()
  }, timeout)
})

const getPrices = async (pricing, services) => {
  const kv = separate(services)
  const data = await Promise.all(kv.v.map(async (v, index) => {
    await wait(index * 300)
    return getPrice(pricing, v)
  }))

  return combine(kv.k, data)
}

module.exports = getPrices
