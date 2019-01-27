import axios from 'axios'

export async function deploy(branch: string): Promise<any> {
  const { CIRCLE_API_TOKEN, CIRCLE_BUILD_ENDPOINT } = process.env

  await axios.post(
    `${CIRCLE_BUILD_ENDPOINT}?circle-token=${CIRCLE_API_TOKEN}`,
    { branch }
  )
}
