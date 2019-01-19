const { parseFirstPrice } = require('../lib/parser')

module.exports = {
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
