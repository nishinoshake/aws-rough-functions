const fs = require('fs')
const AWS = require('aws-sdk')
const pricing = new AWS.Pricing({ region: 'us-east-1' })
const services = require('../../services')
const fetchPrices = require('../../lib/fetchPrices')
const { uploadJson } = require('../../lib/aws/s3')
const { deploy } = require('../../lib/ci/circleci')
const { sendWarning } = require('../../lib/notification/slack')
const { BUCKET_NAME, IS_LOCAL } = process.env

exports.main = async (event, context, callback) => {
  try {
    const prices = await fetchPrices(pricing, services)

    if (IS_LOCAL) {
      fs.writeFileSync(`${__dirname}/../../json/price.json`, JSON.stringify(prices))
    } else {
      await uploadJson(BUCKET_NAME, 'json/price.json', prices)
      await deploy('master')
    }

    callback(null, 'success')
  } catch (err) {
    await sendWarning(err)
    callback(err)
  }
}
