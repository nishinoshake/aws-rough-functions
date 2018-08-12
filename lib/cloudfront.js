const AWS = require('aws-sdk')
const cloudfront = new AWS.CloudFront()

const invalidate = (distributionId, items) => new Promise((resolve, reject) => {
  cloudfront.createInvalidation(
    {
      DistributionId: distributionId,
      InvalidationBatch: {
        CallerReference: Date.now().toString(),
        Paths: {
          Quantity: items.length,
          Items: items
        }
      }
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

module.exports = {
  invalidate
}
