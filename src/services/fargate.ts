import range from 'lodash/range'
import { parseFirstPrice } from '@/lib/parser'

export default {
  cpu: {
    price: {
      params: {
        ServiceCode: 'AmazonECS',
        Filters: {
          location: 'Asia Pacific (Tokyo)',
          usagetype: 'APN1-Fargate-vCPU-Hours:perCPU'
        }
      },
      parse: priceList => parseFirstPrice(priceList[0])
    }
  },
  memory: {
    price: {
      params: {
        ServiceCode: 'AmazonECS',
        Filters: {
          location: 'Asia Pacific (Tokyo)',
          usagetype: 'APN1-Fargate-GB-Hours'
        }
      },
      parse: priceList => parseFirstPrice(priceList[0])
    }
  },
  pair: {
    manual: {
      '0.25': [0.5, ...range(1, 3)],
      '0.5': range(1, 5),
      '1': range(2, 9),
      '2': range(4, 17),
      '4': range(8, 31)
    }
  }
}
