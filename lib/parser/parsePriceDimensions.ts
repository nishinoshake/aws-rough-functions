export function parsePriceDimensions(priceItem: any): any {
  const {
    terms: { OnDemand }
  } = priceItem

  return OnDemand[Object.keys(OnDemand)[0]].priceDimensions
}
