import * as TE from 'fp-ts/TaskEither'
import { mapAll } from '@/config/tests/fixtures'
import { pipe } from 'fp-ts/lib/function'
import { dateCodec } from './date'

const date = new Date().toISOString()

it('should validate date properly', () => {
  pipe(
    date,
    dateCodec.decode,
    TE.fromEither,
    mapAll((result) => expect(result).toBe(date)),
  )
})
