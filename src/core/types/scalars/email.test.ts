import { emailCodec } from './email'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
import { EmapAll } from '@/config/tests/fixtures'

it('should validate email correctly', () => {
  pipe(
    'email@mail.co',
    emailCodec.decode,
    EmapAll((result) => expect(result).toBe('email@mail.co')),
  )
})

it('should return an error when email is invalid', () => {
  pipe(
    'mail',
    emailCodec.decode,
    E.mapLeft((error) => expect(error[0]?.message).toBe('Invalid email')),
  )
})
