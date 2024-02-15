import { createTestDatabase } from '@tests/utils/database'
import { createFakeEntries } from '@server/entities/test/fixtures'
import { authContext } from '@tests/utils/context'
import { Comment } from '@server/entities'
import categoryRouter from '..'

const db = await createTestDatabase()
const fakeEntries = await createFakeEntries(db)
const { remove } = categoryRouter.createCaller(authContext({ db }, fakeEntries.users[2]))
const commentRepository = db.getRepository(Comment)

it('removes comment', async () => {
  const comment = await commentRepository.findOneByOrFail({ userId: fakeEntries.users[2].id })
  const commentCount = await commentRepository.count()
  await remove({ id: comment.id })
  await expect(commentRepository.count()).resolves.toBe(commentCount - 1)
})

it('rejects user that does not own the comment', async () => {
  const comment = await commentRepository.findOneByOrFail({ userId: fakeEntries.users[1].id })
  await expect(remove({ id: comment.id })).rejects.toThrow(/access/i)
})

it('removes comment as admin', async () => {
  const { remove: adminRemove } = categoryRouter.createCaller(
    authContext({ db }, { id: 999, admin: true })
  )
  const comment = await commentRepository.findOneByOrFail({ userId: fakeEntries.users[1].id })
  const commentCount = await commentRepository.count()
  await adminRemove({ id: comment.id })
  await expect(commentRepository.count()).resolves.toBe(commentCount - 1)
})
