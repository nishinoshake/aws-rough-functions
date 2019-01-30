import { fetchPrice } from './fetchPrice'
import { wait, separate, combine } from './helpers'

export async function fetchPrices(getProducts, services) {
  const kv = separate(services)

  const data = await Promise.all(
    kv.values.map(async (obj, index) => {
      if (obj.manual) {
        return obj.manual
      }

      await wait(index * 1000)

      return fetchPrice(getProducts, obj)
    })
  )

  return combine(kv.keys, data)
}
