export interface InstanceOptions {
  name: string
  index: number
  order: string[]
}

export interface ParsedInstance {
  price: number
  instanceType: string
}

export interface ApiGatewayCache {
  cacheMemorySizeGb: string
  price: number
}

export interface PriceRange {
  beginRange: number
  endRange: number | null
  price: number
}

export interface PriceFilter {
  Field: string
  Type: string
  Value: string
}

export interface SeparatedObject {
  keys: string[]
  values: any[]
}

export interface ApiResponse {
  statusCode: number
  headers: any
  body: string
}

export interface PriceItem {
  serviceCode: string
  product: {
    productFamily: string
    attributes: any
  }
  terms: {
    OnDemand: {
      [key: string]: {
        priceDimensions: {
          [key: string]: any
        }
      }
    }
  }
}
