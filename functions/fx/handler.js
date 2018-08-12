const updateFx = require('./updateFx')
const { invalidate } = require('../../lib/cloudfront')
const { sendWarning } = require('../../lib/slack')
const CF_DIST_ID = process.env.CF_DIST_ID

exports.main = async (event, context, callback) => {
  try {
    await updateFx()
    await invalidate(CF_DIST_ID, ['/json/price.json'])

    callback(null, 'success')
  } catch (err) {
    await sendWarning(err)
    callback(err)
  }
}
