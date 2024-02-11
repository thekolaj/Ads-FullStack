import { createTestDatabase } from '@tests/utils/database'
import { createFakeEntries } from '@server/entities/test/fixtures'
import { authContext } from '@tests/utils/context'
import { Comment } from '@server/entities'
import categoryRouter from '..'

const db = await createTestDatabase()
const fakeEntries = await createFakeEntries(db)
const { update } = categoryRouter.createCaller(authContext({ db }, fakeEntries.users[2]))
const commentRepository = db.getRepository(Comment)

it('updates comment', async () => {
  const comment = await commentRepository.findOneByOrFail({ userId: fakeEntries.users[2].id })
  await update({ id: comment.id, text: 'New text!' })
  const newComment = await commentRepository.findOneByOrFail({ id: comment.id })
  expect(newComment.text).toBe('New text!')
})

it('rejects user that does not own the comment', async () => {
  const comment = await commentRepository.findOneByOrFail({ userId: fakeEntries.users[1].id })
  await expect(update({ id: comment.id, text: 'New text!' })).rejects.toThrow(/access/i)
})
