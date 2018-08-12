const { IncomingWebhook } = require('@slack/client')
const url = process.env.SLACK_WEBHOOK_URL
const slack = new IncomingWebhook(url)

const send = message => new Promise((resolve, reject) => {
  slack.send(message, (err, res) => {
    if (err) {
      reject(err)
    } else {
      resolve()
    }
  })
})

const sendWarning = async err => {
  await send(`:warning: Oops\n\n${err}`)
}

module.exports = {
  send,
  sendWarning
}
