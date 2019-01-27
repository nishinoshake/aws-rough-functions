import { parseInstanceType } from '../../../lib/parser'

describe('parseInstanceType', () => {
  test('インスタンスタイプをパースできる', () => {
    const priceList = {
      serviceCode: 'AmazonEC2',
      product: {
        productFamily: '',
        attributes: {
          instanceType: 't2.micro'
        }
      },
      terms: {
        OnDemand: {
          sku: {
            priceDimensions: {
              sku: {}
            }
          }
        }
      }
    }

    expect(parseInstanceType(priceList)).toBe('t2.micro')
  })
})
