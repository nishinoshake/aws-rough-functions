export default [
  {
    terms: {
      OnDemand: {
        sku: {
          priceDimensions: {
            sku01: {
              beginRange: '1000',
              endRange: 'Inf',
              pricePerUnit: {
                USD: '0.1'
              }
            },
            sku02: {
              beginRange: '1',
              endRange: '1000',
              pricePerUnit: {
                USD: '0.2'
              }
            },
            sku03: {
              beginRange: '0',
              endRange: '1',
              pricePerUnit: {
                USD: '0'
              }
            }
          }
        }
      }
    }
  }
]
