import { parseRange, parseFirstPrice, parsePrices } from '@/lib/parser'

export default {
  request: {
    priceRange: {
      params: {
        ServiceCode: 'AmazonSNS',
        Filters: {
          location: 'Asia Pacific (Tokyo)',
          usagetype: 'APN1-Requests-Tier1'
        }
      },
      parse: priceList => parseRange(priceList[0])
    }
  },
  mobile: {
    price: {
      params: {
        ServiceCode: 'AmazonSNS',
        Filters: {
          location: 'Asia Pacific (Tokyo)',
          usagetype: 'APN1-DeliveryAttempts-APNS'
        }
      },
      parse: priceList => parseFirstPrice(priceList[0])
    },
    free: {
      params: {
        ServiceCode: 'AmazonSNS',
        Filters: {
          usagetype: 'Notifications-Mobile',
          group: 'SNS-MonthlyFree-Notifications'
        }
      },
      parse: priceList => parseInt(parsePrices(priceList[0])[0].endRange, 10)
    }
  },
  http: {
    priceRange: {
      params: {
        ServiceCode: 'AmazonSNS',
        Filters: {
          location: 'Asia Pacific (Tokyo)',
          usagetype: 'APN1-DeliveryAttempts-HTTP'
        }
      },
      parse: priceList => parseRange(priceList[0])
    }
  },
  email: {
    priceRange: {
      params: {
        ServiceCode: 'AmazonSNS',
        Filters: {
          location: 'Asia Pacific (Tokyo)',
          usagetype: 'APN1-DeliveryAttempts-SMTP'
        }
      },
      parse: priceList => parseRange(priceList[0])
    }
  }
}
