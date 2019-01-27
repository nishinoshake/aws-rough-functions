export default [
  {
    serviceCode: 'AmazonEC2',
    product: {
      productFamily: '',
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
    serviceCode: 'AmazonEC2',
    product: {
      productFamily: '',
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
