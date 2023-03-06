import { mapAll, unsafe } from '@/config/tests/fixtures';
import { CreateComment } from '@/core/types/comment';
import { pipe } from 'fp-ts/lib/function';
import { NonEmptyString } from 'io-ts-types';
import { addCommentToAnArticle, OutsideCreateComment } from './create-comment';

const data: CreateComment = {
  body: unsafe<NonEmptyString>('Comment for an article'),
};

const emptyData: CreateComment = {
  body: unsafe<NonEmptyString>(''),
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

it('should not accept an empty comment', async () => {
  return pipe(
    emptyData,
    addCommentToAnArticle(registerOk),
    mapAll((result) =>
      expect(result).toEqual(
        new Error('The body of the comment must not be empty.'),
      ),
    ),
  )();
});
