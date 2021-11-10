import axios from 'axios'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'

dayjs.locale('ja')

export default async function(endpoint: string): Promise<number> {
  const yesterday = dayjs().add(-1, 'day').format('YYYY-MM-DD')
  const url = `${endpoint}/${yesterday}?base=USD`
  const res = await axios.get(url)
  const usdjpy = Math.round(parseFloat(res.data.rates.JPY) * 1000) / 1000

  console.log(url)
  console.log(usdjpy)

  // 明らかにおかしい為替じゃないかだけ確認
  if (!usdjpy || usdjpy < 50 || usdjpy > 150) {
    throw new Error(`為替の値がなんだかおかしいです : ${usdjpy}`)
  }

  return usdjpy
}
