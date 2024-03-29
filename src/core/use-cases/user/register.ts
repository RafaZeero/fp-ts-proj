import { CreateUser } from '@/core/types/user';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import { validateUser } from './validate-user';

export type OutsideRegister<A> = (data: CreateUser) => Promise<A>;

export type RegisterUser = <A>(
  outsideRegister: OutsideRegister<A>,
) => (data: CreateUser) => TE.TaskEither<Error, A>;

export const registerUser: RegisterUser = (outsideRegister) => (data) => {
  return pipe(
    data,
    validateUser,
    TE.fromEither,
    TE.chain((validated) =>
      TE.tryCatch(() => outsideRegister(validated), E.toError),
    ),
  );
};
