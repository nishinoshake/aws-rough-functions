'use strict'

const AWS = require('aws-sdk')
const s3 = new AWS.S3({ region: 'ap-northeast-1' })
const pricing = new AWS.Pricing({ region: 'us-east-1' })
const services = require('./lib/services')
const getPrices = require('./lib/getPrices')
const BUCKET_NAME = process.env.BUCKET_NAME

exports.price = (event, context, callback) => {
  getPrices(pricing, services)
    .then(data => {
      s3.upload(
        {
          Bucket: BUCKET_NAME,
          Key: 'json/price.json',
          Body: JSON.stringify(data)
        },
        err => {
          if (err) {
            return callback(err)
          }

          callback(null, 'success')
        }
      )
    })
    .catch(err => callback(err))
}
