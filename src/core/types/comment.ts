import { profileCodec } from '@/core/types/profile';
import { dateCodec, positiveCodec } from '@/core/types/scalars';
import * as t from 'io-ts';
import { NonEmptyString, withMessage } from 'io-ts-types';

export const commentCodec = t.type({
  id: positiveCodec,
  createdAt: dateCodec,
  updatedAt: dateCodec,
  body: t.string,
  author: profileCodec,
});

export type Comment = t.TypeOf<typeof commentCodec>;
export type OutputComment = t.OutputOf<typeof commentCodec>;

export const createCommentCodec = t.type({
  body: withMessage(
    NonEmptyString,
    () => 'The body of the comment must not be empty.',
  ),
});

export type CreateComment = t.TypeOf<typeof createCommentCodec>;
