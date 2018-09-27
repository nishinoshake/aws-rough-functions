const updatePrice = require('./updatePrice')
const { sendWarning } = require('../../lib/slack')
const { IS_LOCAL } = process.env

exports.main = async (event, context, callback) => {
  try {
    await updatePrice()

    if (!IS_LOCAL) {
      // await publish(SNS_PRICE_VALIDATION_ARN, 'price updated')
    }

    callback(null, 'success')
  } catch (err) {
    await sendWarning(err)
    callback(err)
  }
}
