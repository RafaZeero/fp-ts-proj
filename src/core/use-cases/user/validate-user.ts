import { createUserCodec, CreateUser } from '@/core/types/user'
import { pipe } from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import { failure } from 'io-ts/PathReporter'

type ValidateUser = (data: CreateUser) => E.Either<Error, unknown>

export const validateUser: ValidateUser = (data) => {
  return pipe(
    createUserCodec.decode(data),
    E.mapLeft((errors) => new Error(failure(errors).join(':::'))),
  )
}
