import * as fixtures from 'test/fixtures'
import { parsePrices } from '@/lib/parser'

describe('parsePrices', () => {
  test('skuの料金の配列をパースできる', () => {
    const expected = [
      {
        beginRange: '1000',
        endRange: 'Inf',
        pricePerUnit: {
          USD: '0.1'
        }
      },
      {
        beginRange: '1',
        endRange: '1000',
        pricePerUnit: {
          USD: '0.2'
        }
      },
      {
        beginRange: '0',
        endRange: '1',
        pricePerUnit: {
          USD: '0'
        }
      }
    ]

    expect(parsePrices(fixtures.transfer[0])).toEqual(expected)
  })
})
