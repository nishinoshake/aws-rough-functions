import { parseRange } from '@/lib/parser'

export default {
  storage: {
    priceRange: {
      params: {
        ServiceCode: 'AmazonS3',
        Filters: {
          location: 'Asia Pacific (Tokyo)',
          volumeType: 'Standard'
        }
      },
      parse: priceList => parseRange(priceList[0])
    }
  },
  request: {
    read: {
      priceRange: {
        params: {
          ServiceCode: 'AmazonS3',
          Filters: {
            location: 'Asia Pacific (Tokyo)',
            usagetype: 'APN1-Requests-Tier2'
          }
        },
        parse: priceList => parseRange(priceList[0])
      }
    },
    write: {
      priceRange: {
        params: {
          ServiceCode: 'AmazonS3',
          Filters: {
            location: 'Asia Pacific (Tokyo)',
            usagetype: 'APN1-Requests-Tier1'
          }
        },
        parse: priceList => parseRange(priceList[0])
      }
    }
  }
}
