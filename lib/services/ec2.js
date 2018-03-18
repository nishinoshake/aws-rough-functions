const { parseInstances } = require('../parser')

module.exports = {
  instance: {
    params: {
      ServiceCode: 'AmazonEC2',
      Filters: {
        location: 'Asia Pacific (Tokyo)',
        operatingSystem: 'Linux',
        currentGeneration: 'Yes',
        instanceFamily: 'General purpose',
        storage: 'EBS only',
        tenancy: 'Shared'
      }
    },
    parse: priceList =>
      parseInstances(priceList, { index: 0, order: ['t', 'm'] })
  }
}
