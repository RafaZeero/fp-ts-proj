import { urlCodec } from './url'
import { pipe } from 'fp-ts/lib/function'
import { mapAllE } from '@/config/tests/fixtures'

it('should validate url correctly', () => {
  pipe(
    'https://url.com',
    urlCodec.decode,
    mapAllE((result) => expect(result).toBe('https://url.com')),
  )
})

it('should return an error when email is invalid', () => {
  pipe(
    'url',
    urlCodec.decode,
    mapAllE((error) => {
      if (Array.isArray(error)) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(error[0]?.message).toBe('Invalid URL!')
      }
    }),
  )
})
