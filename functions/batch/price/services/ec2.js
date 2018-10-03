const { parseInstances } = require('../parser')

module.exports = {
  instance: {
    params: {
      ServiceCode: 'AmazonEC2',
      Filters: {
        location: 'Asia Pacific (Tokyo)',
        operatingSystem: 'Linux',
        currentGeneration: 'Yes',
        preInstalledSw: 'NA',
        storage: 'EBS only',
        tenancy: 'Shared'
      }
    },
    parse: priceList =>
      parseInstances(priceList, { index: 0, order: ['t2', 't3', 'm4', 'm5', 'c4', 'c5', 'r4', 'r5', 'p2', 'p3', 'g3'] })
  }
}
