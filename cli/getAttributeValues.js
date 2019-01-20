const prettyjson = require('prettyjson')
const { getAttributeValues } = require('../lib/aws/pricing')

const ServiceCode = process.argv[2]
const AttributeName = process.argv[3]

const main = async () => {
  try {
    const data = await getAttributeValues(ServiceCode, AttributeName)

    console.log(prettyjson.render(data))
  } catch (e) {
    console.log(e)
  }
}

main()
