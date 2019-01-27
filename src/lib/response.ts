import { ApiResponse } from '@/lib/types'

export function createResponse({
  statusCode = 200,
  headers = {},
  body = {}
} = {}): ApiResponse {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      ...headers
    },
    body: JSON.stringify(body)
  }
}

export function createClientErrorResponse({
  statusCode = 400,
  headers = {},
  message = 'invalid request'
} = {}): ApiResponse {
  return createResponse({ statusCode, headers, body: { message } })
}

export function createServerErrorResponse({
  statusCode = 503,
  headers = {},
  message = 'oops...'
} = {}): ApiResponse {
  return createResponse({ statusCode, headers, body: { message } })
}
