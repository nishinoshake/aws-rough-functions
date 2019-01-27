import { writeFileSync } from 'fs'
import * as path from 'path'
import set from 'lodash/set'

function wait(timeout: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}

interface SeparatedObject {
  keys: string[]
  values: any[]
}

export function separate(targets: any): SeparatedObject {
  let keys = []
  let values = []

  const deep = (obj, stack) => {
    Object.keys(obj).forEach(name => {
      const str = stack ? `${stack}.${name}` : name

      if (obj[name].parse || obj[name].manual) {
        keys.push(str)
        values.push(obj[name])
      } else {
        deep(obj[name], str)
      }
    })
  }

  deep(targets, '')

  return { keys, values }
}

export function combine(keys: string[], values: any[]): any {
  let obj = {}

  keys.forEach((key, i) => {
    set(obj, key, values[i])
  })

  return obj
}

interface FormattedPriceFilter {
  Field: string
  Type: string
  Value: string
}

export function formatFilters(filters): FormattedPriceFilter[] {
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
    kv.values.map(async (value, index) => {
      if (value.manual) {
        return value.manual
      }

      await wait(index * 500)

      return fetchPrice(getProducts, value)
    })
  )

  return combine(kv.keys, data)
}
