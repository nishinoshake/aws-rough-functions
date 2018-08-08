const { IncomingWebhook } = require('@slack/client')
const url = process.env.SLACK_WEBHOOK_URL
const slack = new IncomingWebhook(url)

module.exports = slack
