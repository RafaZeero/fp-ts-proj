import * as t from 'io-ts'
import * as E from 'fp-ts/Either'
import { withMessage } from 'io-ts-types'
import { pipe } from 'fp-ts/lib/function'

type LengthBrand = {
  readonly NonEmptyString: unique symbol
}

const isNonEmptyString = (value: unknown) =>
  typeof value === 'string' && value.length > 0

const nonEmptyStringCodec = t.brand(
  t.string,
  (value): value is t.Branded<string, LengthBrand> => isNonEmptyString(value),
  'NonEmptyString',
)

type Env = (value: string) => string

export const env: Env = (value) => {
  const envCodec = withMessage(
    nonEmptyStringCodec,
    () => `You must set the env var ${value}`,
  )
  return pipe(
    envCodec.decode(process.env[value]),
    E.fold(
      (error) => {
        throw error
      },
      (value) => value,
    ),
  )
}
