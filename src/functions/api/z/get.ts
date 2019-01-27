import { APIGatewayProxyEvent } from 'aws-lambda'
import * as s3 from '@/lib/aws/s3'
import { isValidHash } from '@/lib/validator'
import {
  createResponse,
  createClientErrorResponse,
  createServerErrorResponse
} from '@/lib/response'

export async function main(event: APIGatewayProxyEvent) {
  const { BUCKET_NAME } = process.env
  const { hash } = event.pathParameters

  if (!isValidHash(hash)) {
    return createClientErrorResponse()
  }

  try {
    const body = await s3.fetchJson(BUCKET_NAME, `json/z/${hash}.json`)

    return createResponse({ body })
  } catch (e) {
    return createServerErrorResponse()
  }
}
