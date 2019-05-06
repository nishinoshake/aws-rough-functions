import { parseFirstPrice } from '@/lib/parser'

export default {
  instance: {
    price: {
      params: {
        ServiceCode: 'AmazonEC2',
        Filters: {
          location: 'Asia Pacific (Tokyo)',
          usagetype: 'APN1-NatGateway-Hours'
        }
      },
      parse: priceList => parseFirstPrice(priceList[0])
    }
  },
  processedData: {
    price: {
      params: {
        ServiceCode: 'AmazonEC2',
        Filters: {
          location: 'Asia Pacific (Tokyo)',
          usagetype: 'APN1-NatGateway-Bytes'
        }
      },
      parse: priceList => parseFirstPrice(priceList[0])
    }
  }
}
