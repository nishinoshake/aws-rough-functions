export default [
  {
    product: {
      attributes: {
        cacheMemorySizeGb: '1.6'
      }
    },
    terms: {
      OnDemand: {
        sku: {
          priceDimensions: {
            sku: {
              pricePerUnit: {
                USD: '0.05'
              }
            }
          }
        }
      }
    }
  },
  {
    product: {
      attributes: {
        cacheMemorySizeGb: '0.5'
      }
    },
    terms: {
      OnDemand: {
        sku: {
          priceDimensions: {
            sku: {
              pricePerUnit: {
                USD: '0.03'
              }
            }
          }
        }
      }
    }
  }
]
