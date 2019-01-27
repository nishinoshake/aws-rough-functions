import { parseRange } from '@/lib/parser'

export default {
  out: {
    priceRange: {
      params: {
        ServiceCode: 'AWSDataTransfer',
        Filters: {
          fromLocation: 'Asia Pacific (Tokyo)',
          usagetype: 'APN1-DataTransfer-Out-Bytes'
        }
      },
      parse: priceList => parseRange(priceList[0])
    }
  }
}
