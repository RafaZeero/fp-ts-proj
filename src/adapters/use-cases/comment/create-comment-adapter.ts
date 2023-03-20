import { CommentOutput as Comment } from '@/core/types/comment';
import {
  OutsideCreateComment,
  AddCommentToAnArticle,
  addCommentToAnArticle as createCommentCore,
} from '@/core/use-cases/article/create-comment';

export type OutsideRegisterComment = OutsideCreateComment<{ comment: Comment }>;

export const addCommentToAnArticle: AddCommentToAnArticle =
  (outsideCreateComment) => (data) =>
    createCommentCore(outsideCreateComment)(data);
