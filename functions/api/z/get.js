const { fetchJson } = require('../../../lib/aws/s3')
const { isValidHash } = require('../../../lib/validator')
const { createResponse, createClientErrorResponse, createServerErrorResponse } = require('../../../lib/response')
const { BUCKET_NAME } = process.env

exports.main = async (event, context, callback) => {
  const { hash } = event.pathParameters

  if (!isValidHash(hash)) {
    callback(null, createClientErrorResponse())
  }

  try {
    const data = await fetchJson(BUCKET_NAME, `json/z/${hash}.json`)

    callback(null, createResponse({ body: data }))
  } catch (err) {
    callback(null, createServerErrorResponse())
  }
}
