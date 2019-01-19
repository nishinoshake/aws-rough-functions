const { parseFirstPrice } = require('../lib/parser')

module.exports = {
  gp2: {
    price: {
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
}
