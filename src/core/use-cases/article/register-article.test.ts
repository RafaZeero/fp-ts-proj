import { pipe } from 'fp-ts/lib/function'
import { CreateArticle } from '@/core/types/article'
import { mapAll } from '@/config/tests/fixtures'
import { registerArticle, OutsideRegister } from './register-article'

const data: CreateArticle = {
  title: 'Article title',
  body: 'Article body',
  description: 'Article description',
}

const registerOk: OutsideRegister<string> = async (data: CreateArticle) => {
  return `Article ${data.title} successfully created!`
}

it('should create an Article', async () => {
  return pipe(
    data,
    registerArticle(registerOk),
    mapAll((result) =>
      expect(result).toBe(`Article ${data.title} successfully created!`),
    ),
  )
})
