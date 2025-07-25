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
          databaseEngine: 'MySQL',
          engineCode: '2'
        }
      },
      parse: priceList =>
        parseInstances(priceList, {
          name: 'RDS MySQL',
          index: 1,
          order: ['t4g', 't3', 'm8g', 'm7g', 'm7i', 'm6g', 'm6i', 'm6in', 'm5', 'r8g', 'r7g', 'r7i', 'r6g', 'r6i', 'r6in', 'r5', 'r5b']
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
          order: ['t4g', 't3', 'm8g', 'm7g', 'm7i', 'm6g', 'm6i', 'm6in', 'm5', 'r8g', 'r7g', 'r7i', 'r6g', 'r6i', 'r6in', 'r5', 'r5b']
        })
    },
    PostgreSQL: {
      params: {
        ServiceCode: 'AmazonRDS',
        Filters: {
          ...rdsFilter,
          databaseEngine: 'PostgreSQL',
          engineCode: '14'
        }
      },
      parse: priceList =>
        parseInstances(priceList, {
          name: 'RDS PostgreSQL',
          index: 1,
          order: ['t4g', 't3', 'm8g', 'm7g', 'm7i', 'm6g', 'm6i', 'm6in', 'm5', 'r8g', 'r7g', 'r7i', 'r6g', 'r6i', 'r6in', 'r5b', 'r5']
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
