const _ = require('lodash')
const { uploadJson } = require('../../../lib/s3')
const { isValidHash } = require('../helpers/validator')
const { createResponse, createClientErrorResponse, createServerErrorResponse } = require('../helpers/response')
const { BUCKET_NAME } = process.env

exports.main = async (event, context, callback) => {
  const {hash, tables} = JSON.parse(event.body)
  let parsedTable

  try {
    parsedTable = JSON.parse(tables)
  } catch (e) {
    callback(null, createClientErrorResponse())
    return
  }

  if (!isValidHash(hash) || !_.isPlainObject(parsedTable)) {
    callback(null, createClientErrorResponse())
    return
  }

  try {
    await uploadJson(BUCKET_NAME, `json/z/${hash}.json`, parsedTable)

    callback(null, callback(null, createResponse()))
  } catch (err) {
    callback(null, createServerErrorResponse())
  }
}
