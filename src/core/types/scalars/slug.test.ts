import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { getErrorMessage, mapAll } from '@/config/tests/fixtures'
import { slugCodec } from './slug'

it('should validate a slug properly', async () => {
  return pipe(
    'valid-slug',
    slugCodec.decode,
    TE.fromEither,
    mapAll((result) => expect(result).toBe('valid-slug')),
  )()
})

it('should accept 3 or more characters', async () => {
  return pipe(
    'slu',
    slugCodec.decode,
    TE.fromEither,
    mapAll((result) => expect(result).toBe('slu')),
  )()
})

it('should not accept number at the beginning of the slug', async () => {
  return pipe(
    '9valid-slug',
    slugCodec.decode,
    TE.fromEither,
    mapAll((errors) => {
      expect(getErrorMessage(errors)).toBe(
        'Invalid Slug! Please, use only alphanumeric characters, dash and/or numbers',
      )
    }),
  )()
})

it('should not accept dashes at the beginning of the slug', async () => {
  return pipe(
    '----invalid-slug',
    slugCodec.decode,
    TE.fromEither,
    mapAll((errors) => {
      expect(getErrorMessage(errors)).toBe(
        'Invalid Slug! Please, use only alphanumeric characters, dash and/or numbers',
      )
    }),
  )()
})

it('should not accept dashes at the end of the slug', async () => {
  return pipe(
    'invalid-slug----',
    slugCodec.decode,
    TE.fromEither,
    mapAll((errors) =>
      expect(getErrorMessage(errors)).toBe(
        'Invalid Slug! Please, use only alphanumeric characters, dash and/or numbers',
      ),
    ),
  )()
})

it('should not accept less than 3 characters', async () => {
  return pipe(
    'aa',
    slugCodec.decode,
    TE.fromEither,
    mapAll((errors) =>
      expect(getErrorMessage(errors)).toBe(
        'Invalid Slug! Please, use only alphanumeric characters, dash and/or numbers',
      ),
    ),
  )()
})
