const fs = require('fs')
const AWS = require('aws-sdk')
const pricing = new AWS.Pricing({ region: 'us-east-1' })
const services = require('../services')
const getPrices = require('./getPrices')
const { uploadJson } = require('./aws/s3')
const { BUCKET_NAME, IS_LOCAL } = process.env

module.exports = async () => {
  const data = await getPrices(pricing, services)

  if (IS_LOCAL) {
    fs.writeFileSync(`${__dirname}/../json/price.json`, JSON.stringify(data))
  } else {
    await uploadJson(BUCKET_NAME, 'json/price.json', data)
  }
}
