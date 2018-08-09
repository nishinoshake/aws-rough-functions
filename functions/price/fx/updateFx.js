const axios = require('axios')
const AWS = require('aws-sdk')
const s3 = new AWS.S3({ region: 'ap-northeast-1' })
const BUCKET_NAME = process.env.BUCKET_NAME
const FX_ENDPOINT = 'https://api.aoikujira.com/kawase/json/usd'

module.exports = () => new Promise((resolve, reject) => {
  axios
    .get(FX_ENDPOINT)
    .then(res => {
      const usdjpy = res.data.JPY

      // 明らかにおかしい為替じゃないかだけ確認
      if (usdjpy < 50 || usdjpy > 150) {
        reject(new Error(`為替の値がなんだかおかしいです : ${usdjpy}`))
        return
      }

      s3.upload(
        {
          Bucket: BUCKET_NAME,
          Key: 'json/fx.json',
          Body: JSON.stringify({
            usdjpy: parseFloat(usdjpy)
          }),
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
