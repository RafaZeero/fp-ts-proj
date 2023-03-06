import { CreateUser, createUserCodec } from '@/core/types/user';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { failure } from 'io-ts/PathReporter';

type ValidateUser = (data: CreateUser) => E.Either<Error, CreateUser>;

export const validateUser: ValidateUser = (data) => {
  return pipe(
    createUserCodec.decode(data),
    E.mapLeft((errors) => new Error(failure(errors).join(':::'))),
  );
};
