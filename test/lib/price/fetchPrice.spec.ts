import * as fixtures from 'test/fixtures'
import { parseInstances } from '@/lib/parser'
import { fetchPrice } from '@/lib/price/fetchPrice'

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
