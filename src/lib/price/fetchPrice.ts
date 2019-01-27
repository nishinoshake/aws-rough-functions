import { writeFileSync } from 'fs'
import * as path from 'path'
import { formatFilters } from './helpers'

export function fetchPrice(getProducts, service) {
  return new Promise((resolve, reject) => {
    const { IS_LOCAL } = process.env

    const fetchPrice = async (params, arr) => {
      try {
        const productParams = {
          ...params,
          Filters: formatFilters(params.Filters)
        }
        const { PriceList, NextToken } = await getProducts(productParams)
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
