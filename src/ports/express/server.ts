import express from 'express'
import type { Request, Response } from 'express'
import * as TE from 'fp-ts/TaskEither'
import { OutsideRegisterType, register } from '@/adapters/user/register-adapter'
import { pipe } from 'fp-ts/lib/function'

const app = express()
const PORT = 3333

app.use(express.urlencoded({ extended: true })) /** Allow req.body */
app.use(express.json())

const outsideRegister: OutsideRegisterType = async (data) => ({ success: true, data })

app.post('/api/users', async (req: Request, res: Response) => {
  return pipe(
    req.body.user,
    register(outsideRegister),
    TE.map(result => res.json(result)),
    TE.mapLeft(error => res.status(401).json({ error: error.message }))
  )()
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
