const updatePrice = require('../../lib/updatePrice')
const { sendWarning } = require('../../lib/notification/slack')
const { deploy } = require('../../lib/ci/circleci')
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
