import sortBy from 'lodash/sortBy'
import flatten from 'lodash/flatten'
import { InstanceOptions, ParsedInstance, PriceItem } from '@/lib/types'
import { parseFirstPrice, parseInstanceType } from './index'

export function parseInstances(
  priceList: PriceItem[],
  options: InstanceOptions
): ParsedInstance[] {
  let obj = {}

  priceList.forEach(priceItem => {
    const instanceType = parseInstanceType(priceItem)
    const prefix = instanceType.split('.')[options.index]

    if (!obj[prefix]) {
      obj[prefix] = []
    }

    obj[prefix].push({
      price: parseFirstPrice(priceItem),
      instanceType
    })
  })

  const prefixes = Object.keys(obj)

  // 未知のインスタンス
  prefixes.forEach(prefix => {
    if (!options.order.includes(prefix)) {
      throw new Error(`${options.name} => 未知のインスタンスを発見 : ${prefix}`)
    }
  })

  // 過去のインスタンス
  options.order.forEach(prefix => {
    if (!prefixes.includes(prefix)) {
      throw new Error(`${options.name} => 過去のインスタンスを発見 : ${prefix}`)
    }
  })

  return flatten(options.order.map(name => sortBy(obj[name], ['price'])))
}
