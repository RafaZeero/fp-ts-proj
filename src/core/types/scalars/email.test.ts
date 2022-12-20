import { emailCodec } from './email'
import { pipe } from 'fp-ts/lib/function'
import { mapAllE } from '@/config/tests/fixtures'

it('should validate email correctly', () => {
  pipe(
    'email@mail.co',
    emailCodec.decode,
    mapAllE((result) => expect(result).toBe('email@mail.co')),
  )
})

it('should return an error when email is invalid', () => {
  pipe(
    'mail',
    emailCodec.decode,
    mapAllE((error) => {
      const errorMessage: string = Array.isArray(error) ? error[0]?.message : ''
      expect(errorMessage).toBe('Invalid email')
    }),
  )
})
