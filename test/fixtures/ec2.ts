export default [
  {
    product: {
      attributes: {
        instanceType: 'm5.large'
      }
    },
    terms: {
      OnDemand: {
        sku: {
          priceDimensions: {
            sku: {
              pricePerUnit: {
                USD: '0.1'
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
        instanceType: 't2.micro'
      }
    },
    terms: {
      OnDemand: {
        sku: {
          priceDimensions: {
            sku: {
              pricePerUnit: {
                USD: '0.01'
              }
            }
          }
        }
      }
    }
  }
]
