import * as TE from 'fp-ts/TaskEither'
import { Email, Password, Slug } from '@/core/types/scalars'
import { pipe } from 'fp-ts/lib/function'

export function unsafeEmail(value: string): Email {
  return value as any
}

export function unsafePassword(value: string): Password {
  return value as any
}

export function unsafeSlug(value: string): Slug {
  return value as any
}

type Callback = (value: unknown) => unknown
type MapAll = (
  fn: Callback,
) => (data: TE.TaskEither<unknown, unknown>) => TE.TaskEither<unknown, unknown>

export const mapAll: MapAll = (fn) => (data) => {
  return pipe(data, TE.map(fn), TE.mapLeft(fn))
}

export const getErrorMessage = (error: unknown): string =>
  Array.isArray(error) ? error[0].message : ''
