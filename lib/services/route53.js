const { parseRange } = require('../parser')

module.exports = {
  hostzone: {
    priceRange: {
      params: {
        ServiceCode: 'AmazonRoute53',
        Filters: {
          usagetype: 'HostedZone'
        }
      },
      parse: priceList => parseRange(priceList[0])
    }
  },
  query: {
    priceRange: {
      params: {
        ServiceCode: 'AmazonRoute53',
        Filters: {
          usagetype: 'DNS-Queries'
        }
      },
      parse: priceList => parseRange(priceList[0])
    }
  }
}
