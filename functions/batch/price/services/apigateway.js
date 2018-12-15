const { parseRange, parseCache } = require('../parser')

module.exports = {
  request: {
    params: {
      ServiceCode: 'AmazonApiGateway',
      Filters: {
        location: 'Asia Pacific (Tokyo)',
        operation: 'ApiGatewayRequest'
      }
    },
    parse: priceList => parseRange(priceList[0])
  },
  cache: {
    params: {
      ServiceCode: 'AmazonApiGateway',
      Filters: {
        location: 'Asia Pacific (Tokyo)',
        operation: 'RunInstances'
      }
    },
    parse: priceList => parseCache(priceList)
  }
}
