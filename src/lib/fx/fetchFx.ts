import axios from 'axios'

const { FX_API_KEY } = process.env

function extractUsdJpy(data: any): number {
  const value =
    data && data.quotes && data.quotes.USDJPY !== undefined
      ? data.quotes.USDJPY
      : data && data.JPY

  return Math.round(parseFloat(value) * 1000) / 1000
}

export default async function(endpoint: string): Promise<number> {
  const res = await axios.get(endpoint, { headers: { apikey: FX_API_KEY }})

  const usdjpy = extractUsdJpy(res.data)

  // 明らかにおかしい為替じゃないかだけ確認
  if (!usdjpy || usdjpy < 50 || usdjpy > 300) {
    throw new Error(`為替の値がなんだかおかしいです : ${usdjpy}`)
  }

  return usdjpy
}
