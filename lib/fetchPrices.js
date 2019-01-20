const fs = require('fs')
const _ = require('lodash')
const { IS_LOCAL } = process.env

const separate = targets => {
  let k = []
  let v = []

  const deep = (obj, stack) => {
    Object.keys(obj).forEach(name => {
      const str = stack ? `${stack}.${name}` : name

      if (obj[name].parse || obj[name].values) {
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

const fetchPrice = (getProducts, service) =>
  new Promise((resolve, reject) => {
    const fetchPrice = async (params, arr) => {
      try {
        const { PriceList, NextToken } = await getProducts({
          ...params,
          Filters: formatFilters(params.Filters)
        })

        const priceLists = arr.concat(PriceList)

        if (NextToken) {
          return fetchPrice({ ...params, NextToken }, priceLists)
        } else {
          if (IS_LOCAL) {
            fs.writeFileSync(
              `${__dirname}/../json/${params.ServiceCode}.json`,
              JSON.stringify(priceLists)
            )
          }
          return resolve(service.parse(priceLists))
        }
      } catch (e) {
        return reject(e)
      }
    }

    fetchPrice(service.params, [])
  })

const wait = timeout =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })

const fetchPrices = async (getProducts, services) => {
  const kv = separate(services)

  const data = await Promise.all(
    kv.v.map(async (v, index) => {
      if (v.values) {
        return v.values
      }

      await wait(index * 1000)

      return fetchPrice(getProducts, v)
    })
  )

  return combine(kv.k, data)
}

module.exports = {
  separate,
  combine,
  formatFilters,
  fetchPrice,
  fetchPrices
}
