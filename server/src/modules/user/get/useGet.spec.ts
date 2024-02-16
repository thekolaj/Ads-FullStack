import { createTestDatabase } from '@tests/utils/database'
import { createFakeUsers } from '@server/entities/test/fixtures'
import userRouter from '..'

const db = await createTestDatabase()
const { get } = userRouter.createCaller({ db })
const fakeUsers = await createFakeUsers(db)

it('returns a user', async () => {
  const user = await get({ id: fakeUsers[0].id })
  expect(user).toEqual(fakeUsers[0])
})

it('require an existing id', async () => {
  await expect(get({ id: 9876 })).rejects.toThrow(/id/i)
})
