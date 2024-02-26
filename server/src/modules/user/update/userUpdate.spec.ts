import { createTestDatabase } from '@tests/utils/database'
import { authContext } from '@tests/utils/context'
import { User } from '@server/entities'
import { fakeUsers, createFakeUsers } from '@server/entities/test/fixtures'
import userRouter from '..'

const db = await createTestDatabase()
const userRepository = db.getRepository(User)
const users = await createFakeUsers(db)
const { update } = userRouter.createCaller(authContext({ db }, users[1]))

it('should update a user', async () => {
  const updates = { ...users[1], name: 'new name', phone: '+11111' }

  const response = await update(updates)
  expect(updates).toMatchObject(response)

  const usersAll = await userRepository.find()

  expect(usersAll).toHaveLength(fakeUsers.length)
  expect(usersAll).toContainEqual(updates)
})

it('should throw an error updating wrong user', async () => {
  await expect(
    update({
      ...users[2],
      name: 'new name',
      phone: '+11111',
    })
  ).rejects.toThrow(/user/i)
})
