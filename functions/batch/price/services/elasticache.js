const { parseInstances } = require('../parser')

module.exports = {
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
      return parseInstances(priceList, { name: 'ElastiCache', index: 1, order: ['t2', 'm5', 'm4', 'm3', 'r5', 'r4', 'r3'] })
    }
  }
}
