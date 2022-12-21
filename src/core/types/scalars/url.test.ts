import * as TE from 'fp-ts/TaskEither'
import { urlCodec } from './url'
import { pipe } from 'fp-ts/lib/function'
import { getErrorMessage, mapAll } from '@/config/tests/fixtures'

it('should validate url correctly', async () => {
  return pipe(
    'https://url.com',
    urlCodec.decode,
    TE.fromEither,
    mapAll((result) => expect(result).toBe('https://url.com')),
  )()
})

it('should return an error when email is invalid', async () => {
  return pipe(
    'url',
    urlCodec.decode,
    TE.fromEither,
    mapAll((error) => {
      expect(getErrorMessage(error)).toBe('Invalid URL!')
    }),
  )()
})
