const fs = require('fs')
const services = require('../../services')
const { fetchPrices } = require('../../lib/fetchPrices')
const pricing = require('../../lib/aws/pricing')
const s3 = require('../../lib/aws/s3')
const circleci = require('../../lib/ci/circleci')
const slack = require('../../lib/notification/slack')
const { BUCKET_NAME, IS_LOCAL } = process.env

exports.main = async (event, context, callback) => {
  try {
    const prices = await fetchPrices(pricing.getProducts, services)

    if (IS_LOCAL) {
      fs.writeFileSync(
        `${__dirname}/../../json/price.json`,
        JSON.stringify(prices)
      )
    } else {
      await s3.uploadJson(BUCKET_NAME, 'json/price.json', prices)
      await circleci.deploy('master')
    }

    callback(null, 'success')
  } catch (err) {
    await slack.sendWarning(err)
    callback(err)
  }
}
