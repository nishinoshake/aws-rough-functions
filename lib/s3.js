const AWS = require('aws-sdk')
const s3 = new AWS.S3({ region: 'ap-northeast-1' })

const uploadJson = (bucketName, path, json) => new Promise((resolve, reject) => {
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
  uploadJson
}
