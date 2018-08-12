const updatePrice = require('./updatePrice')
const { invalidate } = require('../../lib/cloudfront')
const { publish } = require('../../lib/sns')
const { sendWarning } = require('../../lib/slack')
const CF_DIST_ID = process.env.CF_DIST_ID
const SNS_PRICE_VALIDATION_ARN = process.env.SNS_PRICE_VALIDATION_ARN

exports.main = async (event, context, callback) => {
  try {
    await updatePrice()
    await invalidate(CF_DIST_ID, ['/json/price.json'])
    await publish(SNS_PRICE_VALIDATION_ARN, 'price updated')

    callback(null, 'success')
  } catch (err) {
    await sendWarning(err)
    callback(err)
  }
}
