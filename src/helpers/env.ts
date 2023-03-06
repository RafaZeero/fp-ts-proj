import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { NonEmptyString, withMessage } from 'io-ts-types';
import { failure } from 'io-ts/lib/PathReporter';

type Env = (value: string) => string;

export const env: Env = (value) => {
  const envCodec = withMessage(
    NonEmptyString,
    () => `You must set the env var ${value}`,
  );
  return pipe(
    envCodec.decode(process.env[value]),
    E.fold(
      (errors) => {
        throw new Error(failure(errors).join(':::'));
      },
      (value) => value,
    ),
  );
};
