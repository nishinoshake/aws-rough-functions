import { Pricing } from 'aws-sdk'

const pricing = new Pricing({ region: 'us-east-1' })

export function describeServices(ServiceCode: string): Promise<any> {
  return new Promise((resolve, reject) => {
    pricing.describeServices({ ServiceCode }, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export function getAttributeValues(
  ServiceCode: string,
  AttributeName: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    pricing.getAttributeValues({ ServiceCode, AttributeName }, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export function getProducts(params: any): Promise<any> {
  return new Promise((resolve, reject) => {
    pricing.getProducts(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
