import { parseRange, parsePrices } from '@/lib/parser'

export default {
  free: {
    params: {
      ServiceCode: 'AWSQueueService',
      Filters: {
        usagetype: 'Global-Requests',
        locationType: 'AWS Region',
        group: 'SQS-APIRequest-Tier1'
      }
    },
    parse: priceList => parseInt(parsePrices(priceList[0])[0].endRange, 10)
  },
  standard: {
    priceRange: {
      params: {
        ServiceCode: 'AWSQueueService',
        Filters: {
          location: 'Asia Pacific (Tokyo)',
          usagetype: 'APN1-Requests-Tier1'
        }
      },
      parse: priceList => parseRange(priceList[0])
    }
  },
  fifo: {
    priceRange: {
      params: {
        ServiceCode: 'AWSQueueService',
        Filters: {
          location: 'Asia Pacific (Tokyo)',
          usagetype: 'APN1-Requests-FIFO-Tier1'
        }
      },
      parse: priceList => parseRange(priceList[0])
    }
  }
}
