import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import { Email } from '@/core/types/scalars'
import { pipe } from 'fp-ts/lib/function'

export function unsafeEmail(value: string): Email {
  return value as any
}

type Callback = (value: unknown) => unknown
type TEMapAll = (
  fn: Callback,
) => (data: TE.TaskEither<unknown, unknown>) => TE.TaskEither<unknown, unknown>
export const TEmapAll: TEMapAll = (fn) => (data) => {
  return pipe(data, TE.map(fn), TE.mapLeft(fn))
}

type EMapAll = (
  fn: Callback,
) => (data: E.Either<unknown, unknown>) => E.Either<unknown, unknown>
export const EmapAll: EMapAll = (fn) => (data) => {
  return pipe(data, E.map(fn), E.mapLeft(fn))
}
