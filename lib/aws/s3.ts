import { S3 } from 'aws-sdk'

const s3 = new S3({ region: 'ap-northeast-1' })

export function fetchJson(bucketName, path) {
  return new Promise((resolve, reject) => {
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
}


export function uploadJson(bucketName, path, json) {
  return new Promise((resolve, reject) => {
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
}
