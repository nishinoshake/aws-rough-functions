import * as fixtures from '../fixtures'
import { parseInstances, parseRange } from '../../lib/parser'
import {
  separate,
  combine,
  formatFilters,
  fetchPrice,
  fetchPrices
} from '../../lib/fetchPrices'

describe('fetchPrices', () => {
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

  describe('fetchPrice', () => {
    test('サービスを指定して料金を取得できる', async () => {
      const getProducts = jest.fn().mockResolvedValue({
        PriceList: fixtures.ec2,
        NextToken: null
      })
      const service = {
        params: {
          ServiceCode: 'AmazonEC2',
          Filters: {}
        },
        parse: priceList =>
          parseInstances(priceList, {
            name: 'EC2',
            index: 0,
            order: ['t2', 'm5']
          })
      }
      const expected = [
        { price: 0.01, instanceType: 't2.micro' },
        { price: 0.1, instanceType: 'm5.large' }
      ]

      const result = await fetchPrice(getProducts, service)

      expect(result).toEqual(expected)
    })
  })

  describe('fetchPrices', () => {
    test('全サービスの料金を取得できる', async () => {
      const getProducts = jest
        .fn()
        .mockResolvedValueOnce({
          PriceList: fixtures.ec2,
          NextToken: null
        })
        .mockResolvedValueOnce({
          PriceList: fixtures.transfer,
          NextToken: null
        })

      const services = {
        ec2: {
          instance: {
            params: {
              ServiceCode: 'AmazonEC2',
              Filters: {}
            },
            parse: priceList =>
              parseInstances(priceList, {
                name: 'EC2',
                index: 0,
                order: ['t2', 'm5']
              })
          }
        },
        fargate: {
          pair: {
            manual: {
              '0.25': [0.5, 1, 2, 3],
              '0.5': [1, 2, 3, 4, 5]
            }
          }
        },
        transfer: {
          out: {
            priceRange: {
              params: {
                ServiceCode: 'AWSDataTransfer',
                Filters: {}
              },
              parse: priceList => parseRange(priceList[0])
            }
          }
        }
      }
      const expected = {
        ec2: {
          instance: [
            { price: 0.01, instanceType: 't2.micro' },
            { price: 0.1, instanceType: 'm5.large' }
          ]
        },
        fargate: {
          pair: {
            '0.25': [0.5, 1, 2, 3],
            '0.5': [1, 2, 3, 4, 5]
          }
        },
        transfer: {
          out: {
            priceRange: [
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
          }
        }
      }

      const result = await fetchPrices(getProducts, services)

      expect(result).toEqual(expected)
    })
  })
})
