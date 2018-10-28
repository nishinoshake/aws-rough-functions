const prettyjson = require('prettyjson')
const AWS = require('aws-sdk')
const pricing = new AWS.Pricing({ region: 'us-east-1' })

const ServiceCode = process.argv[2]

pricing.describeServices({
  ServiceCode
}, (err, data) => {
  if (err) {
    console.log(err)
  } else {
    console.log(prettyjson.render(data))
  }
})
