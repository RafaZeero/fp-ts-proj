import { CreateUser } from '@/core/types/user'
import { OutsideRegister, Register, register as registerCore } from '@/core/use-cases/user/register'

export const register: Register = (outsideRegister) => (data) => registerCore(outsideRegister)(data)
export type OutsideRegisterType = OutsideRegister<{ readonly success: boolean, readonly data: CreateUser }>
