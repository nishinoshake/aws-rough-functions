const AWS = require('aws-sdk')
const pricing = new AWS.Pricing({ region: 'us-east-1' })
const services = require('./services')
const getPrices = require('./getPrices')
const { uploadJson } = require('../../lib/s3')
const BUCKET_NAME = process.env.BUCKET_NAME

module.exports = async () => {
  const data = await getPrices(pricing, services)

  await uploadJson(BUCKET_NAME, 'json/price.json', data)
}
