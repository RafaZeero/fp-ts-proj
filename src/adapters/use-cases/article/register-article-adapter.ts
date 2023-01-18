import { ArticleOutput as Article } from '@/core/types/article'
import {
  registerArticle as registerArticleCore,
  OutsideRegisterArticle,
  RegisterArticle,
} from '@/core/use-cases/article/register-article'

export type OutsideRegisterType = OutsideRegisterArticle<{ article: Article }>

export const registerArticle: RegisterArticle = (outsideRegister) => (data) =>
  registerArticleCore(outsideRegister)(data)
