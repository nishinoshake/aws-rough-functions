const { parseFirstPrice } = require('../parser')

module.exports = {
  instance: {
    price: {
      params: {
        ServiceCode: 'AmazonEC2',
        Filters: {
          location: 'Asia Pacific (Tokyo)',
          groupDescription: 'Standard Elastic Load Balancer'
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
          groupDescription: 'Data processed by Elastic Load Balancer',
          usagetype: 'APN1-DataProcessing-Bytes'
        }
      },
      parse: priceList => parseFirstPrice(priceList[0])
    }
  }
}
