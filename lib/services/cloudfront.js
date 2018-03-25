const { parseRange } = require('../parser')

module.exports = {
  external: {
    priceRange: {
      params: {
        ServiceCode: 'AmazonCloudFront',
        Filters: {
          fromLocation: 'Asia Pacific',
          toLocation: 'External'
        }
      },
      parse: priceList => parseRange(priceList[0])
    }
  },
  origin: {
    priceRange: {
      params: {
        ServiceCode: 'AmazonCloudFront',
        Filters: {
          fromLocation: 'Asia Pacific',
          toLocation: 'Data Origin'
        }
      },
      parse: priceList => parseRange(priceList[0])
    }
  }
}
