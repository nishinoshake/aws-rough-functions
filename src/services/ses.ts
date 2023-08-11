import { parseFirstPrice } from '@/lib/parser'

export default {
  send: {
    ec2: {
      price: {
        params: {
          ServiceCode: 'AmazonSES',
          Filters: {
            location: 'US East (N. Virginia)',
            usagetype: 'Recipients-EC2',
            operation: 'Send'
          }
        },
        parse: priceList => parseFirstPrice(priceList[0])
      }
    },
    general: {
      price: {
        params: {
          ServiceCode: 'AmazonSES',
          Filters: {
            location: 'US East (N. Virginia)',
            usagetype: 'Recipients',
            operation: 'Send'
          }
        },
        parse: priceList => parseFirstPrice(priceList[0])
      }
    },
    attachment: {
      price: {
        params: {
          ServiceCode: 'AmazonSES',
          Filters: {
            location: 'US East (N. Virginia)',
            usagetype: 'AttachmentsSize-Bytes'
          }
        },
        parse: priceList => parseFirstPrice(priceList[0])
      }
    }
  },
  recieve: {
    request: {
      price: {
        params: {
          ServiceCode: 'AmazonSES',
          Filters: {
            location: 'US East (N. Virginia)',
            usagetype: 'Message',
            operation: 'Receive'
          }
        },
        parse: priceList => parseFirstPrice(priceList[0])
      }
    },
    chunk: {
      price: {
        params: {
          ServiceCode: 'AmazonSES',
          Filters: {
            location: 'US East (N. Virginia)',
            usagetype: 'ReceivedChunk'
          }
        },
        parse: priceList => parseFirstPrice(priceList[0])
      }
    }
  },
  dedicatedIp: {
    price: {
      params: {
        ServiceCode: 'AmazonSES',
        Filters: {
          location: 'US East (N. Virginia)',
          usagetype: 'USE1-DIP-Hours'
        }
      },
      parse: priceList => parseFirstPrice(priceList[0])
    }
  }
}
