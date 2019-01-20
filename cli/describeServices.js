const prettyjson = require('prettyjson')
const pricing = require('../lib/aws/pricing')

const ServiceCode = process.argv[2]

const main = async () => {
  try {
    const data = await pricing.describeServices(ServiceCode)

    console.log(prettyjson.render(data))
  } catch (e) {
    console.log(e)
  }
}

main()
