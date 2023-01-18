import { User } from '@/core/types/user'
import {
  OutsideRegister,
  RegisterUser,
  registerUser as registerCore,
} from '@/core/use-cases/user/register'

export type OutsideRegisterType = OutsideRegister<{ user: User }>

export const register: RegisterUser = (outsideRegister) => (data) =>
  registerCore(outsideRegister)(data)
