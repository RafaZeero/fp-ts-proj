import * as t from 'io-ts'
import { Email } from '@/core/types/scalars'

export function unsafeEmail(value: string): t.TypeOf<typeof Email> {
  return value as any
}
