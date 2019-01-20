module.exports = [
  {
    product: {
      attributes: {
        instanceType: 'cache.t2.small'
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
        instanceType: 'cache.m5.large'
      }
    },
    terms: {
      OnDemand: {
        sku: {
          priceDimensions: {
            sku: {
              pricePerUnit: {
                USD: '0.2'
              }
            }
          }
        }
      }
    }
  }
]
