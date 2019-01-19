const { parseFirstPrice } = require('../lib/parser')

module.exports = {
  instance: {
    price: {
      params: {
        ServiceCode: 'AmazonEC2',
        Filters: {
          location: 'Asia Pacific (Tokyo)',
          usagetype: 'APN1-LoadBalancerUsage',
          operation: 'LoadBalancing:Network'
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
          operation: 'LoadBalancing:Network'
        }
      },
      parse: priceList => parseFirstPrice(priceList[0])
    }
  }
}
