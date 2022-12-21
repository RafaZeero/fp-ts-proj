import * as t from 'io-ts'
import { profileCodec } from '@/core/types/profile'
import { dateCodec, positiveCodec } from '@/core/types/scalars'

export const commentCodec = t.type({
  id: positiveCodec,
  createdAt: dateCodec,
  updatedAt: dateCodec,
  body: t.string,
  author: profileCodec,
})

export type Comment = t.TypeOf<typeof commentCodec>
