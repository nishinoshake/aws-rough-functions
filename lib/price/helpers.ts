import set from 'lodash/set'

export function wait(timeout: number): Promise<void> {
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
