const {
  createResponse,
  createClientErrorResponse,
  createServerErrorResponse
} = require('../../lib/response')

describe('response', () => {
  describe('createResponse', () => {
    test('正常なレスポンスを構築できる', async () => {
      const body = {
        message: 'success'
      }

      const expected = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(body)
      }

      expect(createResponse({ body })).toEqual(expected)
    })
  })

  describe('createClientErrorResponse', () => {
    test('クライアントエラーのレスポンスを構築できる', async () => {
      const expected = {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'invalid request' })
      }

      expect(createClientErrorResponse()).toEqual(expected)
    })
  })

  describe('createServerErrorResponse', () => {
    test('サーバーエラーのレスポンスを構築できる', async () => {
      const expected = {
        statusCode: 503,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'oops...' })
      }

      expect(createServerErrorResponse()).toEqual(expected)
    })
  })
})
