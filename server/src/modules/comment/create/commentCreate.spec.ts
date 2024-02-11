import { createTestDatabase } from '@tests/utils/database'
import { createFakeEntries } from '@server/entities/test/fixtures'
import { authContext } from '@tests/utils/context'
import { Comment } from '@server/entities'
import categoryRouter from '..'

const db = await createTestDatabase()
const fakeEntries = await createFakeEntries(db)
const { create } = categoryRouter.createCaller(authContext({ db }, fakeEntries.users[0]))

it('creates a comment on an ad', async () => {
  const newComment = { adId: fakeEntries.ads[2].id, text: 'new comment' }
  await create(newComment)
  await expect(db.getRepository(Comment).findOneByOrFail(newComment)).resolves.not.toThrow()
})

it('requires an existing ad', async () => {
  await expect(create({ adId: 777, text: 'new comment' })).rejects.toThrow(/ad/i)
})
