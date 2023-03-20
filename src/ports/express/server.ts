import express from 'express';
import type { Request, Response } from 'express';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/lib/function';
import { registerUser } from '@/adapters/use-cases/user/register-adapter';
import { registerArticle } from '@/adapters/use-cases/article/register-article-adapter';
import {
  createUserInDB,
  createArticleInDB,
  createCommentInDB,
} from '@/adapters/ports/db';
import { env } from '@/helpers';
import { addCommentToAnArticle } from '@/adapters/use-cases/comment/create-comment-adapter';

const app = express();
const PORT = env('PORT');

app.use(express.urlencoded({ extended: true })); /** Allow req.body */
app.use(express.json());

// public
app.post('/api/users', async (req: Request, res: Response) => {
  return pipe(
    req.body.user,
    registerUser(createUserInDB),
    TE.map((result) => res.json(result)),
    TE.mapLeft((error) => res.status(422).json(getError(error.message))),
  )();
});

// private
app.post('/api/articles', async (req: Request, res: Response) => {
  return pipe(
    req.body.article,
    registerArticle(createArticleInDB),
    TE.map((result) => res.json(result)),
    TE.mapLeft((error) => res.status(422).json(getError(error.message))),
  )();
});

app.post(
  '/api/articles/:slug/comments',
  async (req: Request, res: Response) => {
    return pipe(
      req.body.comment,
      addCommentToAnArticle(createCommentInDB),
      TE.map((result) => res.json(result)),
      TE.mapLeft((error) => res.status(422).json(getError(error.message))),
    )();
  },
);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

function getError(errors: string) {
  return {
    errors: {
      body: errors.split(':::'),
    },
  };
}
