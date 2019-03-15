import { parseInstances, parseFirstPrice } from '@/lib/parser'

const rdsFilter = {
  location: 'Asia Pacific (Tokyo)',
  currentGeneration: 'Yes',
  storage: 'EBS only',
  deploymentOption: 'Single-AZ'
}

export default {
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
        parseInstances(priceList, {
          name: 'RDS MySQL',
          index: 1,
          order: ['t3', 't2', 'm5', 'm4', 'r5', 'r4']
        })
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
        parseInstances(priceList, {
          name: 'RDS MariaDB',
          index: 1,
          order: ['t3', 't2', 'm5', 'm4', 'r5', 'r4']
        })
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
        parseInstances(priceList, {
          name: 'RDS PostgreSQL',
          index: 1,
          order: ['t3', 't2', 'm5', 'm4', 'r5', 'r4']
        })
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
