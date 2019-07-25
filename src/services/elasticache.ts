import { parseInstances } from '@/lib/parser'

export default {
  instance: {
    params: {
      ServiceCode: 'AmazonElastiCache',
      Filters: {
        location: 'Asia Pacific (Tokyo)',
        currentGeneration: 'Yes',
        cacheEngine: 'Redis'
      }
    },
    parse: priceList => {
      return parseInstances(priceList, {
        name: 'ElastiCache',
        index: 1,
        order: ['t2', 'm5', 'm4', 'r5', 'r4']
      })
    }
  }
}
