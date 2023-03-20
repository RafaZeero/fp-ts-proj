import { OutsideRegisterType } from '@/adapters/use-cases/user/register-adapter';
import { OutsideRegisterType as OutsideRegisterArticle } from '@/adapters/use-cases/article/register-article-adapter';
import slugify from 'slugify';
import { OutsideRegisterComment } from '@/adapters/use-cases/comment/create-comment-adapter';

export const outsideRegister: OutsideRegisterType = async (data) => {
  return {
    user: {
      email: data.email,
      token: '',
      username: data.username,
      bio: '',
      image: undefined,
    },
  };
};

export const outsideRegisterArticle: OutsideRegisterArticle = async (data) => {
  const date = new Date().toISOString();
  return {
    article: {
      slug: slugify(data.title, { lower: true }),
      title: data.title,
      description: data.description,
      body: data.body,
      tagList: data.tagList ?? [],
      createdAt: date,
      updatedAt: date,
      favorited: false,
      favoritesCount: 0,
      // author: {
      //   username: 'jake',
      //   bio: 'I work at statefarm',
      //   image: 'https://i.stack.imgur.com/xHWG8.jpg',
      //   following: false,
      // },
    },
  };
};

export const outsideCreateComment: OutsideRegisterComment = async (data) => {
  const date = new Date().toISOString();

  return {
    comment: {
      id: Date.now(),
      body: data.body,
      createdAt: date,
      updatedAt: date,
      // author: {
      //   username: 'name',
      //   bio: 'I work at Unvoid',
      //   image: 'https://i.stack.imgur.com/xHWG8.jpg',
      //   following: false,
      // },
    },
  };
};
