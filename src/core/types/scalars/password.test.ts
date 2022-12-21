import * as TE from 'fp-ts/TaskEither'
import { getErrorMessage, mapAll } from '@/config/tests/fixtures'
import { pipe } from 'fp-ts/lib/function'
import { passwordCodec } from './password'

it('should validate password properly', async () => {
  return pipe(
    '12345678',
    passwordCodec.decode,
    TE.fromEither,
    mapAll((result) => expect(result).toBe('12345678')),
  )()
})

it('should not accept a password less than 8 characters long', async () => {
  return pipe(
    '123',
    passwordCodec.decode,
    TE.fromEither,
    mapAll((errors) =>
      expect(getErrorMessage(errors)).toBe(
        'Password should be at least 8 characters.',
      ),
    ),
  )()
})
