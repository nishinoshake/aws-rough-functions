import axios from 'axios'

export default async function(url) {
  const res = await axios.get(url)
  const usdjpy = parseFloat(res.data.JPY)

  // 明らかにおかしい為替じゃないかだけ確認
  if (!usdjpy || usdjpy < 50 || usdjpy > 150) {
    throw new Error(`為替の値がなんだかおかしいです : ${usdjpy}`)
  }

  return usdjpy
}
