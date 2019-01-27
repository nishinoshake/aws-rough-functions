import { writeFileSync } from 'fs'
import * as path from 'path'
import set from 'lodash/set'

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}

export function separate(targets) {
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

export function combine(keys, values) {
  let obj = {}

  keys.forEach((key, i) => {
    set(obj, key, values[i])
  })

  return obj
}

export function formatFilters(filters) {
  return Object.keys(filters).map(name => ({
    Field: name,
    Type: 'TERM_MATCH',
    Value: filters[name]
  }))
}

export function fetchPrice(getProducts, service) {
  return new Promise((resolve, reject) => {
    const { IS_LOCAL } = process.env

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
            const jsonPath = path.resolve(
              process.env.LOCAL_PROJECT_DIR,
              `json/${params.ServiceCode}.json`
            )

            writeFileSync(jsonPath, JSON.stringify(priceLists))
          }
          return resolve(service.parse(priceLists))
        }
      } catch (e) {
        return reject(e)
      }
    }

    fetchPrice(service.params, [])
  })
}

export async function fetchPrices(getProducts, services) {
  const kv = separate(services)

  const data = await Promise.all(
    kv.v.map(async (v, index) => {
      if (v.values) {
        return v.values
      }

      await wait(index * 500)

      return fetchPrice(getProducts, v)
    })
  )

  return combine(kv.k, data)
}
