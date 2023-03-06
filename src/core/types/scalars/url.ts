import * as E from 'fp-ts/Either';
import { constFalse, constTrue, pipe } from 'fp-ts/lib/function';
import * as t from 'io-ts';
import { withMessage } from 'io-ts-types';
import { URL } from 'url';

type URLBrand = {
  readonly Url: unique symbol;
};

export const urlCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, URLBrand> => isUrl(value),
    'Url',
  ),
  () => 'Invalid URL!',
);

export type Url = t.TypeOf<typeof urlCodec>;

const isUrl = (input: unknown) => {
  return pipe(
    E.tryCatch(
      () => new URL(typeof input === 'string' ? input : ''),
      E.toError,
    ),
    E.fold(constFalse /* () => false */, constTrue /* () => true */),
  );
};
