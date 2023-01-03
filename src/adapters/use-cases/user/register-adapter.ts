import { User } from '@/core/types/user'
import {
  OutsideRegister,
  Register,
  register as registerCore,
} from '@/core/use-cases/user/register'

export type OutsideRegisterType = OutsideRegister<{ user: User }>

export const register: Register = (outsideRegister) => (data) =>
  registerCore(outsideRegister)(data)
