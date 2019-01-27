import { writeFileSync } from 'fs'
import * as path from 'path'
import fetchFx from '../../lib/fx/fetchFx'
import * as sns from '../../lib/aws/sns'
import * as s3 from '../../lib/aws/s3'
import * as slack from '../../lib/notification/slack'

const { SNS_PRICE_UPDATE_ARN, FX_ENDPOINT, IS_LOCAL, BUCKET_NAME } = process.env

export async function main() {
  try {
    const usdjpy = await fetchFx(FX_ENDPOINT)

    if (IS_LOCAL) {
      const jsonPath = path.resolve(
        process.env.LOCAL_PROJECT_DIR,
        `json/fx.json`
      )

      writeFileSync(jsonPath, JSON.stringify({ usdjpy }))
    } else {
      await s3.uploadJson(BUCKET_NAME, 'json/fx.json', { usdjpy })
      await sns.publish(SNS_PRICE_UPDATE_ARN, 'fx updated')
    }

    return 'success'
  } catch (err) {
    await slack.sendWarning(err)

    throw new Error(err)
  }
}
