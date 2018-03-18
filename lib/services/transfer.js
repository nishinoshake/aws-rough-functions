const { parseRange } = require('../parser')

module.exports = {
  out: {
    params: {
      ServiceCode: 'AWSDataTransfer',
      Filters: {
        fromLocation: 'Asia Pacific (Tokyo)',
        usagetype: 'APN1-DataTransfer-Out-Bytes'
      }
    },
    parse: priceList => parseRange(priceList[0])
  }
}
