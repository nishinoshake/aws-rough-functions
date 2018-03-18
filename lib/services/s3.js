const { parseRange } = require('../parser')

module.exports = {
  storage: {
    params: {
      ServiceCode: 'AmazonS3',
      Filters: {
        location: 'Asia Pacific (Tokyo)',
        volumeType: 'Standard'
      }
    },
    parse: priceList => parseRange(priceList[0])
  }
}
