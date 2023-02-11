import axios from 'axios'

export async function deploy(branch: string): Promise<any> {
  const { CIRCLE_API_TOKEN, CIRCLE_BUILD_ENDPOINT } = process.env

  try {
    await axios.post(
      CIRCLE_BUILD_ENDPOINT,
      { branch },
      {
        headers: {
          'Circle-Token': CIRCLE_API_TOKEN,
          'content-type': 'application/json'
        }
      }
    )
  } catch (e) {
    console.error('CircleCIでエラーが発生しました')
    console.error(`CIRCLE_BUILD_ENDPOINT: ${CIRCLE_BUILD_ENDPOINT}`)
    console.error(e)

    throw new Error(e)
  }
}
