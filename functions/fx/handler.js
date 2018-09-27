const updateFx = require('./updateFx')
const { publish } = require('../../lib/sns')
const { sendWarning } = require('../../lib/slack')

const { SNS_PRICE_UPDATE_ARN, IS_LOCAL } = process.env

exports.main = async (event, context, callback) => {
  try {
    await updateFx()

    if (!IS_LOCAL) {
      await publish(SNS_PRICE_UPDATE_ARN, 'fx updated')
    }

    callback(null, 'success')
  } catch (err) {
    await sendWarning(err)
    callback(err)
  }
}
