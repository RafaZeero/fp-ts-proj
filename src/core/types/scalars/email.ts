import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type EmailBrand = {
  readonly Email: unique symbol
}

export const emailCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, EmailBrand> => isEmail(value),
    'Email',
  ),
  () => 'Invalid email',
)

export type Email = t.TypeOf<typeof emailCodec>

const isEmail = (value: string) => /^\w+.+?@\w+.+?$/.test(value)
