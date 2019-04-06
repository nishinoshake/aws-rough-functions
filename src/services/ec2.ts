import { parseInstances } from '@/lib/parser'

export default {
  instance: {
    params: {
      ServiceCode: 'AmazonEC2',
      Filters: {
        location: 'Asia Pacific (Tokyo)',
        operatingSystem: 'Linux',
        currentGeneration: 'Yes',
        capacitystatus: 'Used',
        preInstalledSw: 'NA',
        storage: 'EBS only',
        tenancy: 'Shared'
      }
    },
    parse: priceList =>
      parseInstances(priceList, {
        name: 'EC2',
        index: 0,
        order: [
          't3',
          't2',
          'm5',
          'm5a',
          'm4',
          'c5',
          'c4',
          'r5',
          'r5a',
          'r4',
          'p3',
          'p2',
          'g3',
          'g3s'
        ]
      })
  }
}
