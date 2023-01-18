import express from 'express'
import type { Request, Response } from 'express'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { registerUser } from '@/adapters/use-cases/user/register-adapter'
import { registerArticle } from '@/adapters/use-cases/article/register-article-adapter'
import {
  userRegister,
  articleRegister as createArticleInDB,
} from '@/adapters/ports/db'

const app = express()
const PORT = process.env.PORT

app.use(express.urlencoded({ extended: true })) /** Allow req.body */
app.use(express.json())

// public
app.post('/api/users', async (req: Request, res: Response) => {
  return pipe(
    req.body.user,
    registerUser(userRegister),
    TE.map((result) => res.json(result)),
    TE.mapLeft((error) => res.status(422).json(getError(error.message))),
  )()
})

// private
app.post('/api/articles', async (req: Request, res: Response) => {
  return pipe(
    req.body.article,
    registerArticle(createArticleInDB),
    TE.map((result) => res.json(result)),
    TE.mapLeft((error) => res.status(422).json(getError(error.message))),
  )()
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

function getError(errors: string) {
  return {
    errors: {
      body: errors.split(':::'),
    },
  }
}
