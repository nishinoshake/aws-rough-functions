import * as fixtures from '../../fixtures'
import { parseInstances } from '../../../lib/parser/parseInstances'
import { parseRange } from '../../../lib/parser/parseRange'
import { fetchPrices } from '../../../lib/price/fetchPrices'

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
