const fs = require('fs')
const AWS = require('aws-sdk')
const pricing = new AWS.Pricing({ region: 'us-east-1' })
const services = require('./services')
const getPrices = require('./getPrices')
const { uploadJson } = require('../../lib/s3')
const { BUCKET_NAME, LOCAL_PRICE_PATH, IS_LOCAL } = process.env

module.exports = async () => {
  const data = await getPrices(pricing, services)

  if (IS_LOCAL) {
    if (LOCAL_PRICE_PATH) {
      fs.writeFileSync(LOCAL_PRICE_PATH, JSON.stringify(data))
    }
  } else {
    await uploadJson(BUCKET_NAME, 'json/price.json', data)
  }
}
