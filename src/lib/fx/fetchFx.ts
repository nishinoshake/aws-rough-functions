import axios from 'axios'

const { FX_API_KEY } = process.env

export default async function(endpoint: string): Promise<number> {
  const res = await axios.get(endpoint, { headers: { apikey: FX_API_KEY }})

  const usdjpy = Math.round(parseFloat(res.data.quotes.USDJPY) * 1000) / 1000

  // 明らかにおかしい為替じゃないかだけ確認
  if (!usdjpy || usdjpy < 50 || usdjpy > 150) {
    throw new Error(`為替の値がなんだかおかしいです : ${usdjpy}`)
  }

  return usdjpy
}
