import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type SlugBrand = {
  readonly Slug: unique symbol
}

export const slugCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, SlugBrand> => isSlug(value),
    'Slug',
  ),
  () =>
    'Invalid Slug! Please, use only alphanumeric characters, dash and/or numbers',
)

export type Slug = t.TypeOf<typeof slugCodec>

/**
 * Accept:
 * - must starts with a lowercase letter,
 * - followed by a lowercase letter, number or dash,
 * - ends with a lowercase letter or number.
 * @param value - string
 * @returns boolean
 */
const isSlug = (value: string): boolean =>
  /^[a-z][a-z0-9_-]+?[a-z0-9]$/.test(value)
