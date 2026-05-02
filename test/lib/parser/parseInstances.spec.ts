import * as fixtures from 'test/fixtures'
import { parseInstances } from '@/lib/parser'

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

  test('reports all unknown instances before throwing', () => {
    const options = {
      name: 'EC2',
      index: 0,
      order: ['t2']
    }
    const priceList = [
      ...fixtures.ec2,
      {
        ...fixtures.ec2[0],
        product: {
          ...fixtures.ec2[0].product,
          attributes: {
            instanceType: 'c6.large'
          }
        }
      }
    ]

    try {
      parseInstances(priceList, options)
    } catch (e) {
      expect(e.message).toContain('m5/c6')
      return
    }

    throw new Error('Expected parseInstances to throw')
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
