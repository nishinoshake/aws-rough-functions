import { parseFirstPrice } from '../lib/parser'

export default {
  instance: {
    price: {
      params: {
        ServiceCode: 'AmazonEC2',
        Filters: {
          location: 'Asia Pacific (Tokyo)',
          usagetype: 'APN1-LoadBalancerUsage',
          operation: 'LoadBalancing'
        }
      },
      parse: priceList => parseFirstPrice(priceList[0])
    }
  },
  transfer: {
    price: {
      params: {
        ServiceCode: 'AmazonEC2',
        Filters: {
          location: 'Asia Pacific (Tokyo)',
          usagetype: 'APN1-DataProcessing-Bytes',
          operation: 'LoadBalancing'
        }
      },
      parse: priceList => parseFirstPrice(priceList[0])
    }
  }
}
