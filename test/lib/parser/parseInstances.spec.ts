import * as fixtures from '../../fixtures'
import * as slack from '../../../lib/notification/slack'
import { parseInstances } from '../../../lib/parser'

jest.mock('../../../lib/notification/slack')
;(slack.sendWarning as any).mockResolvedValue()

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
