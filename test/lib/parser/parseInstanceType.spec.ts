import { parseInstanceType } from '../../../lib/parser'

describe('parseInstanceType', () => {
  test('インスタンスタイプをパースできる', () => {
    const priceList = {
      product: {
        attributes: {
          instanceType: 't2.micro'
        }
      }
    }

    expect(parseInstanceType(priceList)).toBe('t2.micro')
  })
})
