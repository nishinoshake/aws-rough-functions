const fs = require('fs')
const fetchFx = require('../../lib/fetchFx')
const { publish } = require('../../lib/aws/sns')
const { uploadJson } = require('../../lib/aws/s3')
const { sendWarning } = require('../../lib/notification/slack')
const { SNS_PRICE_UPDATE_ARN, FX_ENDPOINT, IS_LOCAL, BUCKET_NAME } = process.env

exports.main = async (event, context, callback) => {
  try {
    const usdjpy = await fetchFx(FX_ENDPOINT)

    if (IS_LOCAL) {
      fs.writeFileSync(
        `${__dirname}/../../json/fx.json`,
        JSON.stringify({ usdjpy })
      )
    } else {
      await uploadJson(BUCKET_NAME, 'json/fx.json', { usdjpy })
      await publish(SNS_PRICE_UPDATE_ARN, 'fx updated')
    }

    callback(null, 'success')
  } catch (err) {
    await sendWarning(err)
    callback(err)
  }
}
