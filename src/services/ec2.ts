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
          'm8g',
          'm7a',
          'm7g',
          'm7i',
          'm7i-flex',
          'm6a',
          'm6g',
          'm6i',
          'm6in',
          'm5',
          'm5a',
          'm5n',
          'm5zn',
          'm4',
          'c8g',
          'c7a',
          'c7gn',
          'c7g',
          'c7i',
          'c7i-flex',
          'c6a',
          'c6i',
          'c6in',
          'c6g',
          'c6gn',
          'c5',
          'c5a',
          'c5n',
          'c4',
          'r8g',
          'r7a',
          'r7g',
          'r7i',
          'r7iz',
          'r6i',
          'r6in',
          'r6g',
          'r6a',
          'r5',
          'r5a',
          'r5b',
          'r5n',
          'r4',
          'p3',
          'p2',
          'g5g',
          'g3',
          'g3s',
          'inf1',
          'inf2',
          'vt1',
          'hpc7g',
          'x2iezn',
          'u-3tb1',
          'u-6tb1'
        ]
      })
  }
}
