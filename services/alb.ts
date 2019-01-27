import { parseFirstPrice } from '../lib/parser'

export default {
  instance: {
    price: {
      params: {
        ServiceCode: 'AmazonEC2',
        Filters: {
          location: 'Asia Pacific (Tokyo)',
          usagetype: 'APN1-LoadBalancerUsage',
          operation: 'LoadBalancing:Application'
        }
      },
      parse: priceList => parseFirstPrice(priceList[0])
    }
  },
  lcu: {
    price: {
      params: {
        ServiceCode: 'AmazonEC2',
        Filters: {
          location: 'Asia Pacific (Tokyo)',
          usagetype: 'APN1-LCUUsage',
          operation: 'LoadBalancing:Application'
        }
      },
      parse: priceList => parseFirstPrice(priceList[0])
    }
  }
}
