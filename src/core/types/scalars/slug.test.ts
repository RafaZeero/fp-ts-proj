import { pipe } from 'fp-ts/lib/function'
import { mapAllE } from '@/config/tests/fixtures'
import { slugCodec } from './slug'

it('should validate a slug properly', () => {
  pipe(
    'valid-slug',
    slugCodec.decode,
    mapAllE((result) => expect(result).toBe('valid-slug')),
  )
})

it('should accept 3 or more characters', () => {
  pipe(
    'slu',
    slugCodec.decode,
    mapAllE((result) => expect(result).toBe('slu')),
  )
})

it('should not accept number at the beginning of the slug', () => {
  pipe(
    '9valid-slug',
    slugCodec.decode,
    mapAllE((errors) => {
      const errorMessage: string = Array.isArray(errors)
        ? errors[0].message
        : ''
      expect(errorMessage).toBe(
        'Invalid Slug! Please, use only alphanumeric characters, dash and/or numbers',
      )
    }),
  )
})

it('should not accept dashes at the beginning of the slug', () => {
  pipe(
    '----invalid-slug',
    slugCodec.decode,
    mapAllE((errors) => {
      const errorMessage: string = Array.isArray(errors)
        ? errors[0].message
        : ''
      expect(errorMessage).toBe(
        'Invalid Slug! Please, use only alphanumeric characters, dash and/or numbers',
      )
    }),
  )
})

it('should not accept dashes at the end of the slug', () => {
  pipe(
    'invalid-slug----',
    slugCodec.decode,
    mapAllE((errors) => {
      const errorMessage: string = Array.isArray(errors)
        ? errors[0].message
        : ''
      expect(errorMessage).toBe(
        'Invalid Slug! Please, use only alphanumeric characters, dash and/or numbers',
      )
    }),
  )
})

it('should not accept less than 3 characters', () => {
  pipe(
    'aa',
    slugCodec.decode,
    mapAllE((errors) => {
      const errorMessage: string = Array.isArray(errors)
        ? errors[0].message
        : ''
      expect(errorMessage).toBe(
        'Invalid Slug! Please, use only alphanumeric characters, dash and/or numbers',
      )
    }),
  )
})
