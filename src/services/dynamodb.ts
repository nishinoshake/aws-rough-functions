import { parseRange, parseFirstPrice } from '@/lib/parser'

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
  provisioning: {
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
  },
  ondemand: {
    write: {
      price: {
        params: {
          ServiceCode: 'AmazonDynamoDB',
          Filters: {
            location: 'Asia Pacific (Tokyo)',
            usagetype: 'APN1-WriteRequestUnits'
          }
        },
        parse: priceList => parseFirstPrice(priceList[0])
      }
    },
    read: {
      price: {
        params: {
          ServiceCode: 'AmazonDynamoDB',
          Filters: {
            location: 'Asia Pacific (Tokyo)',
            usagetype: 'APN1-ReadRequestUnits'
          }
        },
        parse: priceList => parseFirstPrice(priceList[0])
      }
    }
  }
}
