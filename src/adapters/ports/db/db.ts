import {
  outsideRegister,
  outsideRegisterArticle,
} from '@/ports/db-in-memory/db'
import { OutsideRegisterType } from '@/adapters/use-cases/user/register-adapter'
import { OutsideRegisterType as OutsideRegisterArticle } from '@/adapters/use-cases/article/register-article-adapter'

export const createUserInDB: OutsideRegisterType = (data) =>
  outsideRegister(data)

export const createArticleInDB: OutsideRegisterArticle = (data) =>
  outsideRegisterArticle(data)
