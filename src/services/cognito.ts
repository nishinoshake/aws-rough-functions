import { parseRange } from '@/lib/parser'

export default {
  mau: {
    priceRange: {
      params: {
        ServiceCode: 'AmazonCognito',
        Filters: {
          location: 'Asia Pacific (Tokyo)',
          usagetype: 'APN1-CognitoUserPoolsMAU',
        }
      },
      parse: priceList => parseRange(priceList[0])
    },
    free: {
      manual: 50000
    }
  }
}
