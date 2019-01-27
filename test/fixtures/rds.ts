export default [
  {
    serviceCode: 'AmazonEC2',
    product: {
      productFamily: '',
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
    serviceCode: 'AmazonEC2',
    product: {
      productFamily: '',
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
