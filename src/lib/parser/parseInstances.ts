import sortBy from 'lodash/sortBy'
import flatten from 'lodash/flatten'
import uniqBy from 'lodash/uniqBy'
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
  const unknownPrefixes = prefixes.filter(
    prefix => !options.order.includes(prefix)
  )

  // 過去のインスタンス
  const pastPrefixes = options.order.filter(
    prefix => !prefixes.includes(prefix)
  )

  if (unknownPrefixes.length > 0 || pastPrefixes.length > 0) {
    throw new Error(
      [
        unknownPrefixes.length > 0
          ? `${
              options.name
            } => 未知のインスタンスを発見 : ${unknownPrefixes.join('/')}`
          : null,
        pastPrefixes.length > 0
          ? `${options.name} => 過去のインスタンスを発見 : ${pastPrefixes.join(
              '/'
            )}`
          : null
      ]
        .filter(message => message)
        .join('\n')
    )
  }

  prefixes.forEach(p => {
    const instances = obj[p]

    if (instances.length !== uniqBy(instances, 'instanceType').length) {
      throw new Error(`${options.name} => インスタンスが重複しています`)
    }
  })

  return flatten(options.order.map(name => sortBy(obj[name], ['price'])))
}
