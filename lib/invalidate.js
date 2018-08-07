const AWS = require('aws-sdk')
const cloudfront = new AWS.CloudFront()
const CF_DIST_ID = process.env.CF_DIST_ID
const validationPath = ['/json/fx.json', '/json/fx.price']

module.exports = () => new Promise((resolve, reject) => {
  cloudfront.createInvalidation(
    {
      DistributionId: CF_DIST_ID,
      InvalidationBatch: {
        CallerReference: Date.now().toString(),
        Paths: {
          Quantity: validationPath.length,
          Items: validationPath
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
