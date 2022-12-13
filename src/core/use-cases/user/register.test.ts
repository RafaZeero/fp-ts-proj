import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { register, OutsideRegister } from './register'
import { CreateUser } from '@/core/types/user'

const registerOk: OutsideRegister<string> = async (data) => {
  return `User ${data.username} registered with success.`
}

const data: CreateUser = {
  email: 'email@mail.co',
  password: 'safePass',
  username: 'danizeero',
}

it('should register a new user with success', async () => {
  return pipe(
    data,
    register(registerOk),
    TE.map((result) =>
      expect(result).toBe(`User ${data.username} registered with success.`),
    ),
  )()
})
