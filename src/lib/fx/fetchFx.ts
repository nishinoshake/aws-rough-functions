import axios from 'axios'

export default async function(url: string): Promise<number> {
  const res = await axios.get(url)
  const usdjpy = Math.round(parseFloat(res.data.rates.JPY) * 1000) / 1000

  // 明らかにおかしい為替じゃないかだけ確認
  if (!usdjpy || usdjpy < 50 || usdjpy > 150) {
    throw new Error(`為替の値がなんだかおかしいです : ${usdjpy}`)
  }

  return usdjpy
}
