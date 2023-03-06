import { mapAll } from '@/config/tests/fixtures';
import { CreatableArticle } from '@/core/types/article';
import { pipe } from 'fp-ts/lib/function';
import { OutsideRegisterArticle, registerArticle } from './register-article';

const data: CreatableArticle = {
  title: 'Article title',
  body: 'Article body',
  description: 'Article description',
};

const registerOk: OutsideRegisterArticle<string> = async (
  data: CreatableArticle,
) => {
  return `Article ${data.title} successfully created!`;
};

it('should create an Article', async () => {
  return pipe(
    data,
    registerArticle(registerOk),
    mapAll((result) =>
      expect(result).toBe(`Article ${data.title} successfully created!`),
    ),
  )();
});
