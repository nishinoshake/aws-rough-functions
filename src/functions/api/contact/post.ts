import sg from '@sendgrid/mail'
import { APIGatewayProxyEvent } from 'aws-lambda'
import {
  createResponse,
  createClientErrorResponse,
  createServerErrorResponse
} from '@/lib/response'

export async function main(event: APIGatewayProxyEvent) {
  const SEND_GRID_API_KEY = process.env.SEND_GRID_API_KEY || ''
  const SEND_GRID_EMAIL_FROM = process.env.SEND_GRID_EMAIL_FROM || ''
  const SEND_GRID_EMAIL_TO = process.env.SEND_GRID_EMAIL_TO || ''

  let body

  console.log(event)

  if (!SEND_GRID_API_KEY || !SEND_GRID_EMAIL_FROM || !SEND_GRID_EMAIL_TO) {
    return createServerErrorResponse()
  }

  try {
    body = JSON.parse(event.body)
  } catch (e) {
    return createClientErrorResponse()
  }

  const text = body.text

  if (!text || text.length > 4096) {
    return createClientErrorResponse()
  }

  try {
    const message = {
      to: SEND_GRID_EMAIL_TO,
      from: SEND_GRID_EMAIL_FROM,
      subject: '[ざっくりAWS]お問い合わせ',
      text,
    };
  
    sg.setApiKey(SEND_GRID_API_KEY)
  
    await sg.send(message)

    return createResponse()
  } catch (e) {
    return createServerErrorResponse()
  }
}
