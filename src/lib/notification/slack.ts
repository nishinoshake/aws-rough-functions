import { IncomingWebhook } from '@slack/webhook'

export async function send(text: string): Promise<void> {
  const url = process.env.SLACK_WEBHOOK_URL || ''
  const slack = new IncomingWebhook(url)

  await slack.send({ text })
}

export async function sendWarning(err): Promise<void> {
  console.log('***********slack called************')
  await send(`:warning: Oops\n\n${err}`)
}
