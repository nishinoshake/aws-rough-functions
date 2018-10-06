const { fetchJson } = require('../../../lib/s3')
const { isValidHash } = require('../helpers/validator')
const { createResponse, createClientErrorResponse, createServerErrorResponse } = require('../helpers/response')
const { BUCKET_NAME } = process.env

exports.main = async (event, context, callback) => {
  const { hash } = event.pathParameters

  if (!isValidHash(hash)) {
    callback(null, createClientErrorResponse())
  }

  try {
    const data = await fetchJson(BUCKET_NAME, `json/z/${hash}.json`)

    callback(null, createResponse({body: data}))
  } catch (err) {
    callback(null, createServerErrorResponse())
  }
}
