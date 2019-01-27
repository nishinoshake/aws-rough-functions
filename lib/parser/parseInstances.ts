import sortBy from 'lodash/sortBy'
import flatten from 'lodash/flatten'
import * as slack from '../notification/slack'
import { parseInstanceType } from './parseInstanceType'
import { parseFirstPrice } from './parseFirstPrice'
import { InstanceOptions, ParsedInstance, PriceItem } from '../types'

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
      // tslint:disable-next-line:no-floating-promises
      slack.sendWarning(
        `${options.name} => 未知のインスタンスを発見 : ${prefix}`
      )
      throw new Error('未知のインスタンスを発見')
    }
  })

  // 過去のインスタンス
  options.order.forEach(prefix => {
    if (!prefixes.includes(prefix)) {
      // tslint:disable-next-line:no-floating-promises
      slack.sendWarning(
        `${
          options.name
        } => このインスタンスは過去のものになったみたいです : ${prefix}`
      )
      throw new Error('このインスタンスは過去のものになったみたいです')
    }
  })

  return flatten(options.order.map(name => sortBy(obj[name], ['price'])))
}
