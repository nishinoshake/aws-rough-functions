const createResponse = ({
  statusCode = 200,
  headers = {},
  body = {}
} = {}) => ({
  statusCode: statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*',
    ...headers
  },
  body: JSON.stringify(body)
})

const createClientErrorResponse = ({
  statusCode = 400,
  headers = {},
  message = 'invalid request'
} = {}) => {
  return createResponse({ statusCode, headers, body: { message } })
}

const createServerErrorResponse = ({
  statusCode = 503,
  headers = {},
  message = 'oops...'
} = {}) => {
  return createResponse({ statusCode, headers, body: { message } })
}

module.exports = {
  createResponse,
  createClientErrorResponse,
  createServerErrorResponse
}
