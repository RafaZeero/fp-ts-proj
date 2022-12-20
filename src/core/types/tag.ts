import * as t from 'io-ts'
import { slugCodec } from './scalars/slug'

export const tagCodec = slugCodec

export type Tag = t.TypeOf<typeof tagCodec>
