import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { getErrorMessage, mapAll } from '@/config/tests/fixtures'
import { positiveCodec } from './positive'

it('should validate positive number properly', async () => {
  return pipe(
    1,
    positiveCodec.decode,
    TE.fromEither,
    mapAll((result) => expect(result).toBe(1)),
  )()
})

it('should accept zero', async () => {
  return pipe(
    0,
    positiveCodec.decode,
    TE.fromEither,
    mapAll((result) => expect(result).toBe(0)),
  )()
})

it('should not accept a negative number', async () => {
  return pipe(
    -1,
    positiveCodec.decode,
    TE.fromEither,
    mapAll((errors) =>
      expect(getErrorMessage(errors)).toBe(
        'Invalid number. This number should be greater than zero.',
      ),
    ),
  )()
})
