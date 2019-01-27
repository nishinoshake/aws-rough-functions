import { SNS } from 'aws-sdk'

const sns = new SNS()

export function publish(arn, message = 'message is empty') {
  return new Promise((resolve, reject) => {
    sns.publish(
      {
        Message: message,
        TopicArn: arn
      },
      err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      }
    )
  })
}
