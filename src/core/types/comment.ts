import { profileCodec } from '@/core/types/profile';
import { dateCodec, positiveCodec } from '@/core/types/scalars';
import * as t from 'io-ts';

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
  body: t.string,
});

export type CreateComment = t.TypeOf<typeof createCommentCodec>;
