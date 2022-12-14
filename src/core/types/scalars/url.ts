import { URL } from 'url'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type URLBrand = {
  readonly Url: unique symbol
}

export const urlCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, URLBrand> => isValidUrl(value),
    'Url',
  ),
  () => 'Invalid URL!',
)

export type Url = t.TypeOf<typeof urlCodec>

const isValidUrl = (input: unknown) => {
  try {
    const url = new URL(typeof input === 'string' ? input : '')
    return !!url
  } catch {
    return false
  }
}
