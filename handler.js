const updatePrice = require('./lib/updatePrice')
const updateFx = require('./lib/updateFx')
const invalidate = require('./lib/invalidate')

exports.price = async (event, context, callback) => {
  try {
    await Promise.all([updatePrice(), updateFx()])
    await invalidate()

    callback(null, 'success')
  } catch (err) {
    callback(err)
  }
}
