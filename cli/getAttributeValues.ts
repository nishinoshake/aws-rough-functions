import prettyjson from 'prettyjson'
import { getAttributeValues } from '../lib/aws/pricing'

const main = async () => {
  const ServiceCode = process.argv[2]
  const AttributeName = process.argv[3]

  try {
    const data = await getAttributeValues(ServiceCode, AttributeName)

    console.log(prettyjson.render(data))
  } catch (e) {
    console.log(e)
  }
}

main()
