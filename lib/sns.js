const AWS = require('aws-sdk')
const sns = new AWS.SNS()

const publish = (arn, message = 'message is empty') => new Promise((resolve, reject) => {
  sns.publish({
    Message: message,
    TopicArn: arn
  }, err => {
    if (err) {
      reject(err)
    } else {
      resolve()
    }
  })
})

module.exports = {
  publish
}
