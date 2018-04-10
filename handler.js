'use strict'

const axios = require('axios')
const AWS = require('aws-sdk')
const s3 = new AWS.S3({ region: 'ap-northeast-1' })
const cloudfront = new AWS.CloudFront()
const pricing = new AWS.Pricing({ region: 'us-east-1' })
const services = require('./lib/services')
const getPrices = require('./lib/getPrices')
const BUCKET_NAME = process.env.BUCKET_NAME
const CF_DIST_ID = process.env.CF_DIST_ID
const FX_ENDPOINT = 'https://api.aoikujira.com/kawase/json/usd'

const invalidate = name =>
  new Promise((resolve, reject) => {
    cloudfront.createInvalidation(
      {
        DistributionId: CF_DIST_ID,
        InvalidationBatch: {
          CallerReference: `${name}${Date.now()}`,
          Paths: {
            Quantity: 1,
            Items: [`/json/${name}.json`]
          }
        }
      },
      (err, data) => {
        if (err) {
          return reject(err)
        }

        resolve(data)
      }
    )
  })

exports.price = (event, context, callback) => {
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
            return callback(err)
          }

          invalidate('price')
            .then(() => {
              callback(null, 'success')
            })
            .catch(err => {
              callback(err)
            })
        }
      )
    })
    .catch(err => callback(err))
}

exports.fx = (event, context, callback) => {
  axios
    .get(FX_ENDPOINT)
    .then(function (response) {
      s3.upload(
        {
          Bucket: BUCKET_NAME,
          Key: 'json/fx.json',
          Body: JSON.stringify({
            usdjpy: parseFloat(response.data.JPY)
          }),
          ContentType: 'application/json',
          CacheControl: 'no-store'
        },
        err => {
          if (err) {
            return callback(err)
          }

          invalidate('fx')
            .then(() => {
              callback(null, 'success')
            })
            .catch(err => {
              callback(err)
            })
        }
      )
    })
    .catch(err => callback(err))
}
