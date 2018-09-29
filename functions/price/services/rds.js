const { parseInstances, parseFirstPrice } = require('../parser')

const rdsFilter = {
  location: 'Asia Pacific (Tokyo)',
  currentGeneration: 'Yes',
  instanceFamily: 'General purpose',
  storage: 'EBS only',
  deploymentOption: 'Single-AZ'
}

module.exports = {
  instance: {
    MySQL: {
      params: {
        ServiceCode: 'AmazonRDS',
        Filters: {
          ...rdsFilter,
          databaseEngine: 'MySQL'
        }
      },
      parse: priceList =>
        parseInstances(priceList, { index: 1, order: ['t', 'm'] })
    },
    MariaDB: {
      params: {
        ServiceCode: 'AmazonRDS',
        Filters: {
          ...rdsFilter,
          databaseEngine: 'MariaDB'
        }
      },
      parse: priceList =>
        parseInstances(priceList, { index: 1, order: ['t', 'm'] })
    },
    PostgreSQL: {
      params: {
        ServiceCode: 'AmazonRDS',
        Filters: {
          ...rdsFilter,
          databaseEngine: 'PostgreSQL'
        }
      },
      parse: priceList =>
        parseInstances(priceList, { index: 1, order: ['t', 'm'] })
    }
  },
  storage: {
    gp2: {
      price: {
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
  }
}
