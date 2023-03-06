import { mapAll, unsafe } from '@/config/tests/fixtures';
import { CreateComment } from '@/core/types/comment';
import { pipe } from 'fp-ts/lib/function';
import { NonEmptyString } from 'io-ts-types';
import { addCommentToAnArticle, OutsideCreateComment } from './create-comment';

const data: CreateComment = {
  body: unsafe<NonEmptyString>('Comment for an article'),
};

const registerOk: OutsideCreateComment<string> = async (data) =>
  `Comment added successfully: ${data.body}`;

it('should add comment to an article properly', async () => {
  return pipe(
    data,
    addCommentToAnArticle(registerOk),
    mapAll((result) =>
      expect(result).toBe(`Comment added successfully: ${data.body}`),
    ),
  )();
});
