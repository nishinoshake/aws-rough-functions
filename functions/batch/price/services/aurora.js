const { parseInstances, parseFirstPrice } = require('../parser')

const auroraFilter = {
  location: 'Asia Pacific (Tokyo)',
  storage: 'EBS only',
  deploymentOption: 'Single-AZ'
}

module.exports = {
  instance: {
    MySQL: {
      params: {
        ServiceCode: 'AmazonRDS',
        Filters: {
          ...auroraFilter,
          databaseEngine: 'Aurora MySQL'
        }
      },
      parse: priceList => parseInstances(priceList, { name: 'Aurora MySQL', index: 1, order: ['t2', 'r4'] })
    },
    PostgreSQL: {
      params: {
        ServiceCode: 'AmazonRDS',
        Filters: {
          ...auroraFilter,
          databaseEngine: 'Aurora PostgreSQL'
        }
      },
      parse: priceList => parseInstances(priceList, { name: 'Aurora PostgreSQL', index: 1, order: ['r4'] })
    }
  },
  storage: {
    price: {
      params: {
        ServiceCode: 'AmazonRDS',
        Filters: {
          location: 'Asia Pacific (Tokyo)',
          databaseEngine: 'Any',
          usagetype: 'APN1-Aurora:StorageUsage'
        }
      },
      parse: priceList => parseFirstPrice(priceList[0])
    }
  },
  io: {
    price: {
      params: {
        ServiceCode: 'AmazonRDS',
        Filters: {
          location: 'Asia Pacific (Tokyo)',
          databaseEngine: 'Any',
          usagetype: 'APN1-Aurora:StorageIOUsage'
        }
      },
      parse: priceList => parseFirstPrice(priceList[0])
    }
  }
}
