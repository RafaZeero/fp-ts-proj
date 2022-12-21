import * as TE from 'fp-ts/TaskEither'
import { emailCodec } from './email'
import { pipe } from 'fp-ts/lib/function'
import { getErrorMessage, mapAll } from '@/config/tests/fixtures'

it('should validate email correctly', async () => {
  return pipe(
    'email@mail.co',
    emailCodec.decode,
    TE.fromEither,
    mapAll((result) => expect(result).toBe('email@mail.co')),
  )()
})

it('should return an error when email is invalid', async () => {
  return pipe(
    'mail',
    emailCodec.decode,
    TE.fromEither,
    mapAll((errors) => expect(getErrorMessage(errors)).toBe('Invalid email')),
  )()
})
