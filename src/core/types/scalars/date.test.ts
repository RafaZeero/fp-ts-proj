import * as TE from 'fp-ts/TaskEither'
import { getErrorMessage, mapAll } from '@/config/tests/fixtures'
import { pipe } from 'fp-ts/lib/function'
import { dateCodec } from './date'

it('should validate date properly', async () => {
  const date = new Date().toISOString()
  return pipe(
    date,
    dateCodec.decode,
    TE.fromEither,
    mapAll((result) => expect(result).toBe(date)),
  )()
})

it('should not accept a string different from date ISOString', async () => {
  return pipe(
    '05/05/2022',
    dateCodec.decode,
    TE.fromEither,
    mapAll((errors) =>
      expect(getErrorMessage(errors)).toBe(
        'Invalid date! Please use date.toISOString()',
      ),
    ),
  )()
})
