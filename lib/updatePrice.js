const AWS = require('aws-sdk')
const s3 = new AWS.S3({ region: 'ap-northeast-1' })
const pricing = new AWS.Pricing({ region: 'us-east-1' })
const services = require('./services')
const getPrices = require('./getPrices')
const BUCKET_NAME = process.env.BUCKET_NAME

module.exports = () => new Promise((resolve, reject) => {
  getPrices(pricing, services)
    .then(data => {
      s3.upload(
        {
          Bucket: BUCKET_NAME,
          Key: 'json/price.json',
          Body: JSON.stringify(data),
          ContentType: 'application/json',
          CacheControl: 'no-store'
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
    .catch(err => reject(err))
})
