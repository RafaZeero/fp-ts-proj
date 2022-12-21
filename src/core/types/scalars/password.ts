import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type PasswordBrand = {
  readonly Password: unique symbol
}

export const passwordCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, PasswordBrand> => isValidPassword(value),
    'Password',
  ),
  () => 'Password should be at least 8 characters.',
)

export type Password = t.TypeOf<typeof passwordCodec>

const isValidPassword = (input: string): boolean =>
  input.length >= 8
