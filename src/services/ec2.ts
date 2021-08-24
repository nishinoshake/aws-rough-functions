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
          't4g',
          't3',
          't3a',
          't2',
          'm6g',
          'm6i',
          'm5',
          'm5a',
          'm5n',
          'm5zn',
          'm4',
          'a1',
          'c6g',
          'c6gn',
          'c5',
          'c5a',
          'c5n',
          'c4',
          'r6g',
          'r5',
          'r5a',
          'r5b',
          'r5n',
          'r4',
          'p3',
          'p2',
          'g3',
          'g3s',
          'inf1'
        ]
      })
  }
}
