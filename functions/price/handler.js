const updatePrice = require('./aws/updatePrice')
const invalidate = require('./aws/invalidate')
const updateFx = require('./fx/updateFx')
const slack = require('../../lib/slack')

exports.main = async (event, context, callback) => {
  try {
    await Promise.all([updatePrice(), updateFx()])
    await invalidate()

    callback(null, 'success')
  } catch (err) {
    slack.send(`:warning: ALARM : price\n\n${err}`, () => {
      callback(err)
    })
  }
}
