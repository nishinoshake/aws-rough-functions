const { parseFirstPrice, parseRange } = require('../parser')

module.exports = {
  transfer: {
    external: {
      priceRange: {
        params: {
          ServiceCode: 'AmazonCloudFront',
          Filters: {
            fromLocation: 'Japan',
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
            fromLocation: 'Japan',
            toLocation: 'Data Origin'
          }
        },
        parse: priceList => parseRange(priceList[0])
      }
    }
  },
  request: {
    http: {
      priceRange: {
        params: {
          ServiceCode: 'AmazonCloudFront',
          Filters: {
            location: 'Japan',
            requestType: 'CloudFront-Request-HTTP-Proxy'
          }
        },
        parse: priceList => parseFirstPrice(priceList[0])
      }
    },
    https: {
      priceRange: {
        params: {
          ServiceCode: 'AmazonCloudFront',
          Filters: {
            location: 'Japan',
            requestType: 'CloudFront-Request-HTTPS-Proxy'
          }
        },
        parse: priceList => parseFirstPrice(priceList[0])
      }
    }
  }
}
