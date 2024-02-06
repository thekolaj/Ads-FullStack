import { createTestDatabase } from '@tests/utils/database'
import { authContext } from '@tests/utils/context'
import { User } from '@server/entities'
import { fakeUsers } from '@server/entities/test/fixtures'
import userRouter from '..'

const db = await createTestDatabase()
const userRepository = db.getRepository(User)
const users = await userRepository.save(fakeUsers)
const { update } = userRouter.createCaller(authContext({ db }, users[1]))

it('should update a user', async () => {
  const { password, ...updates } = {
    ...users[1],
    name: 'new name',
    phone: '+11111',
  }

  const response = await update(updates)
  expect(response).toEqual(updates)

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
