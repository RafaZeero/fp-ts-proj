import { CreateComment } from '@/core/types/comment';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';

export type OutsideCreateComment<A> = (data: CreateComment) => Promise<A>;
export type AddCommentToAnArticle = <A>(
  o: OutsideCreateComment<A>,
) => (data: CreateComment) => TE.TaskEither<Error, A>;

export const addCommentToAnArticle: AddCommentToAnArticle =
  // @ts-ignore
  (outsideCreateComment) => (data) => {
    return pipe(TE.tryCatch(() => outsideCreateComment(data), E.throwError));
  };
