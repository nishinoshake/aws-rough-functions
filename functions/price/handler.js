const updatePrice = require('./aws/updatePrice')
const invalidate = require('./aws/invalidate')
const updateFx = require('./fx/updateFx')

exports.main = async (event, context, callback) => {
  try {
    await Promise.all([updatePrice(), updateFx()])
    await invalidate()

    callback(null, 'success')
  } catch (err) {
    callback(err)
  }
}
