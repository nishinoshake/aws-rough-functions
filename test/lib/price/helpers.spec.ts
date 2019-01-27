import { separate, combine, formatFilters } from '@/lib/price/helpers'

describe('helpers', () => {
  describe('separate', () => {
    test('設定ファイルのキーと値を分割できる', () => {
      // parseの関数か手入力のmanualに遭遇するまで掘って値を返す
      const targets = {
        instance: {
          MySQL: {
            params: { name: 'MySQL' },
            parse: 'Function'
          },
          PostgreSQL: {
            params: { name: 'PostgreSQL' },
            parse: 'Function'
          }
        },
        storage: {
          gp2: {
            price: {
              params: { name: 'gp2' },
              parse: 'Function'
            }
          }
        },
        manual: {
          manual: {
            hoge: 'fuga'
          }
        }
      }
      const expected = {
        keys: [
          'instance.MySQL',
          'instance.PostgreSQL',
          'storage.gp2.price',
          'manual'
        ],
        values: [
          {
            params: { name: 'MySQL' },
            parse: 'Function'
          },
          {
            params: { name: 'PostgreSQL' },
            parse: 'Function'
          },
          {
            params: { name: 'gp2' },
            parse: 'Function'
          },
          {
            manual: {
              hoge: 'fuga'
            }
          }
        ]
      }

      expect(separate(targets)).toEqual(expected)
    })
  })

  describe('combine', () => {
    test('キーと値を結合してオブジェクトを構築できる', () => {
      const keys = [
        'instance.MySQL',
        'instance.PostgreSQL',
        'storage.gp2.price',
        'manual'
      ]
      const values = [
        [{ price: 0.02, instanceType: 'db.t2.micro' }],
        [{ price: 0.02, instanceType: 'db.t2.micro' }],
        0.14,
        {
          hoge: 'fuga'
        }
      ]
      const expected = {
        instance: {
          MySQL: [{ price: 0.02, instanceType: 'db.t2.micro' }],
          PostgreSQL: [{ price: 0.02, instanceType: 'db.t2.micro' }]
        },
        storage: {
          gp2: {
            price: 0.14
          }
        },
        manual: {
          hoge: 'fuga'
        }
      }

      expect(combine(keys, values)).toEqual(expected)
    })
  })

  describe('formatFilters', () => {
    test('Filtersの形式をAPIの仕様に合わせて整形できる', () => {
      const filters = {
        location: 'Asia Pacific (Tokyo)',
        operatingSystem: 'Linux'
      }
      const expected = [
        {
          Field: 'location',
          Type: 'TERM_MATCH',
          Value: 'Asia Pacific (Tokyo)'
        },
        {
          Field: 'operatingSystem',
          Type: 'TERM_MATCH',
          Value: 'Linux'
        }
      ]

      expect(formatFilters(filters)).toEqual(expected)
    })
  })
})
