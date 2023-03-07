import { mapAll, unsafe } from '@/config/tests/fixtures';
import { CreateArticle } from '@/core/types/article';
import { pipe } from 'fp-ts/lib/function';
import { OutsideRegisterArticle, registerArticle } from './register-article';

const data: CreateArticle = {
  title: 'Article title',
  body: 'Article body',
  description: 'Article description',
};

const dataWithTagList: CreateArticle = {
  title: 'Article title 2',
  body: 'Article body 2',
  description: 'Article description 2',
  tagList: [unsafe('tag1'), unsafe('tag2')],
};

const dataWithInvalidTagList: CreateArticle = {
  title: 'Article title 3',
  body: 'Article body 3',
  description: 'Article description 3',
  tagList: [unsafe('tag1'), unsafe('3ag2-wrong')],
};

const dataWithInvalidTitle: CreateArticle = {
  title: unsafe(1),
  body: 'Article body',
  description: 'Article description',
};

const registerOk: OutsideRegisterArticle<string> = async (
  data: CreateArticle,
) => {
  return `Article ${data.title} successfully created!`;
};

const registerFail: OutsideRegisterArticle<never> = async () => {
  throw new Error('External error');
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

it('should create an article with tagList properly', async () => {
  return pipe(
    dataWithTagList,
    registerArticle(registerOk),
    mapAll((result) =>
      expect(result).toBe(
        `Article ${dataWithTagList.title} successfully created!`,
      ),
    ),
  )();
});

it('should not accept article register if tagList has invalid slugs', async () => {
  return pipe(
    dataWithInvalidTagList,
    registerArticle(registerOk),
    mapAll((result) =>
      expect(result).toEqual(
        new Error(
          'Invalid Slug! Please, use only alphanumeric characters, dash and/or numbers',
        ),
      ),
    ),
  )();
});

it('should not accept article if title is invalid', async () => {
  return pipe(
    dataWithInvalidTitle,
    registerArticle(registerOk),
    mapAll((result) => expect(result).toEqual(new Error('Invalid title'))),
  )();
});

it('should not register the article if outsideRegister function throws an error', async () => {
  return pipe(
    data,
    registerArticle(registerFail),
    mapAll((result) => expect(result).toEqual(new Error('External error'))),
  )();
});
