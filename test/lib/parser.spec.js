const slack = require('../../lib/notification/slack')
const fixtures = require('../fixtures')
const {
  parseInstanceType,
  parseInstances,
  parseRange,
  parsePriceDimensions,
  parsePrices,
  parseFirstPrice,
  parseCache
} = require('../../lib/parser')

jest.mock('../../lib/notification/slack')
slack.sendWarning.mockResolvedValue('')

describe('parser', () => {
  describe('parseInstanceType', () => {
    test('インスタンスタイプをパースできる', () => {
      const priceList = {
        product: {
          attributes: {
            instanceType: 't2.micro'
          }
        }
      }

      expect(parseInstanceType(priceList)).toBe('t2.micro')
    })
  })

  describe('parseInstances', () => {
    test('インスタンスをパースして指定した順番にソートできる', () => {
      const options = {
        name: 'EC2',
        index: 0,
        order: ['t2', 'm5']
      }
      const expected = [
        { price: 0.01, instanceType: 't2.micro' },
        { price: 0.1, instanceType: 'm5.large' }
      ]

      expect(parseInstances(fixtures.ec2, options)).toEqual(expected)
    })

    test('未知のインスタンスがあったら例外を投げる', () => {
      const options = {
        name: 'EC2',
        index: 0,
        order: ['t2']
      }

      expect(() => parseInstances(fixtures.ec2, options)).toThrowError('未知')
    })

    test('インスタンスがなかったら例外を投げる', () => {
      const options = {
        name: 'EC2',
        index: 0,
        order: ['t2', 'm5', 'z5']
      }

      expect(() => parseInstances(fixtures.ec2, options)).toThrowError('過去')
    })
  })

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

  describe('parseFirstPrice', () => {
    test('skuの最初の料金をパースできる', () => {
      const expected = 0.1

      expect(parseFirstPrice(fixtures.ec2[0])).toEqual(expected)
    })
  })

  describe('parseCache', () => {
    test('API Gatewayのキャッシュメモリをパースして昇順でソートして取得できる', () => {
      const expected = [
        { cacheMemorySizeGb: '0.5', price: 0.03 },
        { cacheMemorySizeGb: '1.6', price: 0.05 }
      ]

      expect(parseCache(fixtures.apigateway)).toEqual(expected)
    })
  })
})
