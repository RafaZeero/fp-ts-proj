import { User } from '@/core/types/user'
import {
  OutsideRegister,
  RegisterUser,
  registerUser as registerUserCore,
} from '@/core/use-cases/user/register'

export type OutsideRegisterType = OutsideRegister<{ user: User }>

export const registerUser: RegisterUser = (outsideRegister) => (data) =>
  registerUserCore(outsideRegister)(data)
