import { parseInstances, parseFirstPrice } from '@/lib/parser'

const auroraFilter = {
  location: 'Asia Pacific (Tokyo)',
  storage: 'EBS only',
  deploymentOption: 'Single-AZ'
}

export default {
  instance: {
    MySQL: {
      params: {
        ServiceCode: 'AmazonRDS',
        Filters: {
          ...auroraFilter,
          databaseEngine: 'Aurora MySQL'
        }
      },
      parse: priceList =>
        parseInstances(priceList, {
          name: 'Aurora MySQL',
          index: 1,
          order: ['t4g', 't3', 't2', 'r7g', 'r7i', 'r6g', 'r6i', 'r5', 'r4']
        })
    },
    PostgreSQL: {
      params: {
        ServiceCode: 'AmazonRDS',
        Filters: {
          ...auroraFilter,
          databaseEngine: 'Aurora PostgreSQL'
        }
      },
      parse: priceList =>
        parseInstances(priceList, {
          name: 'Aurora PostgreSQL',
          index: 1,
          order: ['t4g', 't3', 'r7g', 'r7i', 'r6g', 'r6i', 'r5', 'r4']
        })
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
