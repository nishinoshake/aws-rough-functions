const { isValidHash } = require('../../lib/validator')

describe('validator', () => {
  describe('isValidHash', () => {
    test('20文字の16進数ならtrue', async () => {
      const hash = '0123456789abcdef0123'

      expect(isValidHash(hash)).toBe(true)
    })

    test('20文字だけど16進数じゃなければfalse', async () => {
      const hash = '0123456789abcdefg012'

      expect(isValidHash(hash)).toBe(false)
    })

    test('19文字の16進数はfalse', async () => {
      const hash = '0123456789abcdef012'

      expect(isValidHash(hash)).toBe(false)
    })

    test('21文字の16進数はfalse', async () => {
      const hash = '0123456789abcdef01234'

      expect(isValidHash(hash)).toBe(false)
    })
  })
})
