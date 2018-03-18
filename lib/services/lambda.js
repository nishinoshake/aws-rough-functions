const { parseFirstPrice, parsePrices } = require('../parser')

module.exports = {
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
      params: {
        ServiceCode: 'AWSLambda',
        Filters: {
          location: 'Any',
          group: 'AWS-Lambda-Requests'
        }
      },
      parse: priceList => parseInt(parsePrices(priceList[0])[0].endRange, 10)
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
      params: {
        ServiceCode: 'AWSLambda',
        Filters: {
          location: 'Any',
          group: 'AWS-Lambda-Duration'
        }
      },
      parse: priceList => parseInt(parsePrices(priceList[0])[0].endRange, 10)
    }
  }
}
