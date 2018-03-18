const { parseFirstPrice } = require('../parser')

module.exports = {
  gp2: {
    params: {
      ServiceCode: 'AmazonEC2',
      Filters: {
        location: 'Asia Pacific (Tokyo)',
        usagetype: 'APN1-EBS:VolumeUsage.gp2'
      }
    },
    parse: priceList => parseFirstPrice(priceList[0])
  }
}
