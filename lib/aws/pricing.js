const AWS = require('aws-sdk')
const pricing = new AWS.Pricing({ region: 'us-east-1' })

const describeServices = ServiceCode =>
  new Promise((resolve, reject) => {
    pricing.describeServices({ ServiceCode }, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })

const getAttributeValues = (ServiceCode, AttributeName) =>
  new Promise((resolve, reject) => {
    pricing.getAttributeValues({ ServiceCode, AttributeName }, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })

const getProducts = params =>
  new Promise((resolve, reject) => {
    pricing.getProducts(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })

module.exports = {
  describeServices,
  getAttributeValues,
  getProducts
}
