import { parseRange } from '../lib/parser'

export default {
  storage: {
    priceRange: {
      params: {
        ServiceCode: 'AmazonDynamoDB',
        Filters: {
          location: 'Asia Pacific (Tokyo)',
          usagetype: 'APN1-TimedStorage-ByteHrs'
        }
      },
      parse: priceList => parseRange(priceList[0])
    }
  },
  wcu: {
    priceRange: {
      params: {
        ServiceCode: 'AmazonDynamoDB',
        Filters: {
          location: 'Asia Pacific (Tokyo)',
          usagetype: 'APN1-WriteCapacityUnit-Hrs'
        }
      },
      parse: priceList => parseRange(priceList[0])
    }
  },
  rcu: {
    priceRange: {
      params: {
        ServiceCode: 'AmazonDynamoDB',
        Filters: {
          location: 'Asia Pacific (Tokyo)',
          usagetype: 'APN1-ReadCapacityUnit-Hrs'
        }
      },
      parse: priceList => parseRange(priceList[0])
    }
  }
}
