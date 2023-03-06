import { CreateComment } from '@/core/types/comment';
import * as TE from 'fp-ts/TaskEither';

type OutsideCreateComment<A> = (data: CreateComment) => Promise<A>;
export type AddCommentToAnArticle = <A>(
  o: OutsideCreateComment<A>,
) => (data: CreateComment) => TE.TaskEither<Error, A>;
