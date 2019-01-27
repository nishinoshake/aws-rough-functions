import * as fixtures from '../../fixtures'
import { parseFirstPrice } from '../../../lib/parser'

describe('parseFirstPrice', () => {
  test('skuの最初の料金をパースできる', () => {
    const expected = 0.1

    expect(parseFirstPrice(fixtures.ec2[0])).toEqual(expected)
  })
})
