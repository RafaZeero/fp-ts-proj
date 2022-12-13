import { Email } from './email'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'

it('should validate email correctly', () => {
  pipe(
    'email@mail.co',
    Email.decode,
    E.map((result) => expect(result).toBe('email@mail.co')),
  )
})

it('should return an error when email is invalid', () => {
  pipe(
    'mail',
    Email.decode,
    E.mapLeft((error) => expect(error[0]?.message).toBe('Invalid email')),
  )
})
