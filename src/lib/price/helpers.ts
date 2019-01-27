import set from 'lodash/set'
import { PriceFilter, SeparatedObject } from '@/lib/types'

export function wait(timeout: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
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

export function formatFilters(filters: any): PriceFilter[] {
  return Object.keys(filters).map(name => ({
    Field: name,
    Type: 'TERM_MATCH',
    Value: filters[name]
  }))
}
