const updatePrice = require('./lib/updatePrice')
const updateFx = require('./lib/updateFx')
const invalidate = require('./lib/invalidate')

exports.price = (event, context, callback) => {
  Promise.all([updatePrice(), updateFx()])
    .then(() => {
      invalidate()
        .then(() => {
          callback(null, 'success')
        })
        .catch(err => {
          callback(err)
        })
    })
    .catch(err => {
      callback(err)
    })
}
