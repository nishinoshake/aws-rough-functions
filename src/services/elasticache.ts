import { parseInstances } from '@/lib/parser'

export default {
  instance: {
    params: {
      ServiceCode: 'AmazonElastiCache',
      Filters: {
        location: 'Asia Pacific (Tokyo)',
        locationType: 'AWS Region',
        currentGeneration: 'Yes',
        cacheEngine: 'Redis'
      }
    },
    parse: priceList => {
      return parseInstances(priceList, {
        name: 'ElastiCache',
        index: 1,
        order: ['t4g', 't3', 't2', 'm6g', 'm5', 'm4', 'r6gd', 'r6g', 'r5', 'r4']
      })
    }
  }
}
