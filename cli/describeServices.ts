import prettyjson from 'prettyjson'
import { describeServices } from '../lib/aws/pricing'

const main = async () => {
  const ServiceCode = process.argv[2]

  try {
    const data = await describeServices(ServiceCode)

    console.log(prettyjson.render(data))
  } catch (e) {
    console.log(e)
  }
}

// tslint:disable-next-line:no-floating-promises
main()
