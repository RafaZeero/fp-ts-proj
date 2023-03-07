import { mapAll, unsafe } from '@/config/tests/fixtures';
import { Email, Password, Slug } from '@/core/types/scalars';
import { CreateUser } from '@/core/types/user';
import { pipe } from 'fp-ts/lib/function';
import { OutsideRegister, registerUser } from './register';

const unsafeEmail = (value: unknown) => unsafe<Email>(value);
const unsafeSlug = (value: unknown) => unsafe<Slug>(value);
const unsafePassword = (value: unknown) => unsafe<Password>(value);

const registerOk: OutsideRegister<string> = async (data) => {
  return `User ${data.username} registered with success.`;
};

const registerFail: OutsideRegister<never> = async () => {
  throw new Error('External error!');
};

const data: CreateUser = {
  email: unsafeEmail('email@mail.co'),
  password: unsafePassword('safePass'),
  username: unsafeSlug('dandanzeero'),
};

const dataWithWrongUsername: CreateUser = {
  username: unsafeSlug('a'),
  email: unsafeEmail('email@mail.co'),
  password: unsafePassword('safePass'),
};

const dataWithWrongEmailAndPassword: CreateUser = {
  username: unsafeSlug('dandanzeero'),
  email: unsafeEmail('email'),
  password: unsafePassword('invalid'),
};

it('should register a new user properly', async () => {
  return pipe(
    data,
    registerUser(registerOk),
    mapAll((result) =>
      expect(result).toBe(`User ${data.username} registered with success.`),
    ),
  )();
});

it('should not accept register from user with invalid username', async () => {
  return pipe(
    dataWithWrongUsername,
    registerUser(registerOk),
    mapAll((error) =>
      expect(error).toEqual(
        new Error(
          'Invalid Slug! Please, use only alphanumeric characters, dash and/or numbers',
        ),
      ),
    ),
  )();
});

it('should not accept register from user with invalid email and/or invalid password', async () => {
  return pipe(
    dataWithWrongEmailAndPassword,
    registerUser(registerOk),
    mapAll((error) =>
      expect(error).toEqual(
        new Error('Invalid email:::Password should be at least 8 characters.'),
      ),
    ),
  )();
});

it('should return a Left if register function throws an error', async () => {
  return pipe(
    data,
    registerUser(registerFail),
    mapAll((error) => expect(error).toEqual(new Error('External error!'))),
  )();
});
