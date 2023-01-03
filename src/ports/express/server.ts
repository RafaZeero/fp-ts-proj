import express from 'express'
import type { Request, Response } from 'express'
import * as TE from 'fp-ts/TaskEither'
import { register } from '@/adapters/use-cases/user/register-adapter'
import { pipe } from 'fp-ts/lib/function'
import { userRegister } from '@/adapters/ports/db'

const app = express()
const PORT = process.env.PORT

app.use(express.urlencoded({ extended: true })) /** Allow req.body */
app.use(express.json())

app.post('/api/users', async (req: Request, res: Response) => {
  return pipe(
    req.body.user,
    register(userRegister),
    TE.map((result) => res.json(result)),
    TE.mapLeft((error) => res.status(401).json({ error: error.message })),
  )()
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
