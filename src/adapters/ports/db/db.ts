import {
  outsideRegister,
  outsideRegisterArticle,
  outsideCreateComment,
} from '@/ports/db-in-memory/db';
import { OutsideRegisterType } from '@/adapters/use-cases/user/register-adapter';
import { OutsideRegisterType as OutsideRegisterArticle } from '@/adapters/use-cases/article/register-article-adapter';
import { OutsideRegisterComment } from '@/adapters/use-cases/comment/create-comment-adapter';

export const createUserInDB: OutsideRegisterType = (data) =>
  outsideRegister(data);

export const createArticleInDB: OutsideRegisterArticle = (data) =>
  outsideRegisterArticle(data);

export const createCommentInDB: OutsideRegisterComment = (data) =>
  outsideCreateComment(data);
