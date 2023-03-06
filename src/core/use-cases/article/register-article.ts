import { CreatableArticle } from '@/core/types/article';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';

export type OutsideRegisterArticle<A> = (data: CreatableArticle) => Promise<A>;

export type RegisterArticle = <A>(
  outsideRegister: OutsideRegisterArticle<A>,
) => (data: CreatableArticle) => TE.TaskEither<Error, A>;

export const registerArticle: RegisterArticle = (outsideRegister) => (data) => {
  return TE.tryCatch(() => outsideRegister(data), E.toError);
};
