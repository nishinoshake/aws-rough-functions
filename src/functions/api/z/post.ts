import { APIGatewayProxyEvent } from 'aws-lambda'
import isPlainObject from 'lodash/isPlainObject'
import * as s3 from '@/lib/aws/s3'
import { isValidHash } from '@/lib/validator'
import {
  createResponse,
  createClientErrorResponse,
  createServerErrorResponse
} from '@/lib/response'

export async function main(event: APIGatewayProxyEvent) {
  const { BUCKET_NAME } = process.env
  const { hash, tables } = JSON.parse(event.body)

  let parsedTable: any

  try {
    parsedTable = JSON.parse(tables)
  } catch (e) {
    return createClientErrorResponse()
  }

  if (!isValidHash(hash) || !isPlainObject(parsedTable)) {
    return createClientErrorResponse()
  }

  try {
    await s3.uploadJson(BUCKET_NAME, `json/z/${hash}.json`, parsedTable)

    return createResponse()
  } catch (e) {
    return createServerErrorResponse()
  }
}
