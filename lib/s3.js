const AWS = require('aws-sdk')
const s3 = new AWS.S3({ region: 'ap-northeast-1' })

const fetchJson = (bucketName, path) =>
  new Promise((resolve, reject) => {
    s3.getObject(
      {
        Bucket: bucketName,
        Key: path
      },
      (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(JSON.parse(data.Body.toString()))
        }
      }
    )
  })

const uploadJson = (bucketName, path, json) =>
  new Promise((resolve, reject) => {
    s3.upload(
      {
        Bucket: bucketName,
        Key: path,
        Body: JSON.stringify(json),
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

module.exports = {
  fetchJson,
  uploadJson
}
