const updatePrice = require('./updatePrice')
const { sendWarning } = require('../../lib/slack')
const { deploy } = require('../../lib/circleci')
const { IS_LOCAL } = process.env

exports.main = async (event, context, callback) => {
  try {
    await updatePrice()

    if (!IS_LOCAL) {
      await deploy('master')
    }

    callback(null, 'success')
  } catch (err) {
    await sendWarning(err)
    callback(err)
  }
}
