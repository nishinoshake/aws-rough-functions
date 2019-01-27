import * as fixtures from '../../fixtures'
import { parsePriceDimensions } from '../../../lib/parser'

describe('parsePriceDimensions', () => {
  test('priceDimensionsをパースできる', () => {
    const expected = {
      sku: {
        pricePerUnit: {
          USD: '0.1'
        }
      }
    }

    expect(parsePriceDimensions(fixtures.ec2[0])).toEqual(expected)
  })
})
