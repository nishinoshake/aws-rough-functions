import * as fixtures from '../../fixtures'
import { parseCache } from '../../../lib/parser'

describe('parseCache', () => {
  test('API Gatewayのキャッシュメモリをパースして昇順でソートして取得できる', () => {
    const expected = [
      { cacheMemorySizeGb: '0.5', price: 0.03 },
      { cacheMemorySizeGb: '1.6', price: 0.05 }
    ]

    expect(parseCache(fixtures.apigateway)).toEqual(expected)
  })
})
