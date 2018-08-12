const axios = require('axios')
const { uploadJson } = require('../../lib/s3')
const BUCKET_NAME = process.env.BUCKET_NAME
const FX_ENDPOINT = 'https://api.aoikujira.com/kawase/json/usd'

module.exports = async () => {
  const res = await axios.get(FX_ENDPOINT)
  const usdjpy = res.data.JPY

  // 明らかにおかしい為替じゃないかだけ確認
  if (usdjpy < 50 || usdjpy > 150) {
    throw new Error(`為替の値がなんだかおかしいです : ${usdjpy}`)
  }

  await uploadJson(BUCKET_NAME, 'json/fx.json', {usdjpy: parseFloat(usdjpy)})
}
