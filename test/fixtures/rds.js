module.exports = [
  {
    product: {
      attributes: {
        instanceType: 'db.r4.large'
      }
    },
    terms: {
      OnDemand: {
        sku: {
          priceDimensions: {
            sku: {
              pricePerUnit: {
                USD: '0.3'
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
        instanceType: 'db.m4.large'
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
