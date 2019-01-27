interface ResponseInterafce {
  statusCode: number
  headers: any
  body: string
}

export function createResponse({
  statusCode = 200,
  headers = {},
  body = {}
} = {}): ResponseInterafce {
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
} = {}): ResponseInterafce {
  return createResponse({ statusCode, headers, body: { message } })
}

export function createServerErrorResponse({
  statusCode = 503,
  headers = {},
  message = 'oops...'
} = {}): ResponseInterafce {
  return createResponse({ statusCode, headers, body: { message } })
}
