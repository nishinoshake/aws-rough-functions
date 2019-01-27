import * as fixtures from 'test/fixtures'
import { parseRange } from '@/lib/parser'

describe('parseRange', () => {
  test('料金のレンジを昇順でソートして取得できる', () => {
    const expected = [
      {
        beginRange: 0,
        endRange: 1,
        price: 0
      },
      {
        beginRange: 1,
        endRange: 1000,
        price: 0.2
      },
      {
        beginRange: 1000,
        endRange: null,
        price: 0.1
      }
    ]

    expect(parseRange(fixtures.transfer[0])).toEqual(expected)
  })
})
