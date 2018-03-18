const { parseInstances, parseFirstPrice } = require('../parser')

module.exports = {
  instance: {
    params: {
      ServiceCode: 'AmazonRDS',
      Filters: {
        location: 'Asia Pacific (Tokyo)',
        currentGeneration: 'Yes',
        instanceFamily: 'General purpose',
        databaseEngine: 'MySQL',
        storage: 'EBS only',
        deploymentOption: 'Single-AZ'
      }
    },
    parse: priceList =>
      parseInstances(priceList, { index: 1, order: ['t', 'm'] })
  },
  storage: {
    params: {
      ServiceCode: 'AmazonRDS',
      Filters: {
        location: 'Asia Pacific (Tokyo)',
        usagetype: 'APN1-RDS:GP2-Storage',
        deploymentOption: 'Single-AZ'
      }
    },
    parse: priceList => parseFirstPrice(priceList[0])
  }
}
