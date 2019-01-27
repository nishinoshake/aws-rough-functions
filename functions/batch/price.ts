import { writeFileSync } from 'fs'
import * as path from 'path'
import * as services from '../../services'
import { fetchPrices } from '../../lib/fetchPrices'
import * as pricing from '../../lib/aws/pricing'
import * as s3 from '../../lib/aws/s3'
import * as circleci from '../../lib/ci/circleci'
import * as slack from '../../lib/notification/slack'

export async function main() {
  const { BUCKET_NAME, IS_LOCAL } = process.env

  try {
    const prices = await fetchPrices(pricing.getProducts, services)

    if (IS_LOCAL) {
      const jsonPath = path.resolve(process.env.LOCAL_PROJECT_DIR, `json/price.json`)

      writeFileSync(jsonPath, JSON.stringify(prices))
    } else {
      await s3.uploadJson(BUCKET_NAME, 'json/price.json', prices)
      await circleci.deploy('master')
    }

    return 'success'
  } catch (err) {
    await slack.sendWarning(err)

    throw new Error(err)
  }
}
