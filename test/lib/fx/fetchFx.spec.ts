import axios from 'axios'
import fetchFx from '@/lib/fx/fetchFx'

jest.mock('axios')

describe('fetchFx', () => {
  test('妥当な為替を取得できたらそのまま返す', async () => {
    ;(axios.get as any).mockResolvedValue({
      data: {
        JPY: 100
      }
    })

    const usdjpy = await fetchFx('url')

    expect(usdjpy).toBe(100)
  })

  test('おかしな為替を取得したら例外を投げる', async () => {
    ;(axios.get as any).mockResolvedValue({
      data: {
        JPY: 5
      }
    })

    await expect(fetchFx('url')).rejects.toThrow('為替の値がなんだか')
  })
})
