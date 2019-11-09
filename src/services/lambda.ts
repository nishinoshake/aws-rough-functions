import { parseFirstPrice } from '@/lib/parser'

export default {
  request: {
    price: {
      params: {
        ServiceCode: 'AWSLambda',
        Filters: {
          location: 'Asia Pacific (Tokyo)',
          group: 'AWS-Lambda-Requests'
        }
      },
      parse: priceList => parseFirstPrice(priceList[0])
    },
    free: {
      manual: 1e6
    }
  },
  memory: {
    price: {
      params: {
        ServiceCode: 'AWSLambda',
        Filters: {
          location: 'Asia Pacific (Tokyo)',
          group: 'AWS-Lambda-Duration'
        }
      },
      parse: priceList => parseFirstPrice(priceList[0])
    },
    free: {
      manual: 4e5
    }
  }
}
