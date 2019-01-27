import { IncomingWebhook } from '@slack/client'

export function send(message: string): Promise<void> {
  const url = process.env.SLACK_WEBHOOK_URL || ''
  const slack = new IncomingWebhook(url)

  return new Promise((resolve, reject) => {
    slack.send(message, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

export async function sendWarning(err): Promise<void> {
  console.log('***********slack called************')
  await send(`:warning: Oops\n\n${err}`)
}
