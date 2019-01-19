const prettyjson = require('prettyjson')
const AWS = require('aws-sdk')
const pricing = new AWS.Pricing({ region: 'us-east-1' })

const ServiceCode = process.argv[2]
const AttributeName = process.argv[3]

pricing.getAttributeValues(
  {
    ServiceCode,
    AttributeName
  },
  (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(prettyjson.render(data))
    }
  }
)
