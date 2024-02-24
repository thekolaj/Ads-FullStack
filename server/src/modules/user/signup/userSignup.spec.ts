import { createTestDatabase } from '@tests/utils/database'
import { User } from '@server/entities'
import { fakeUsers } from '@server/entities/test/fixtures'
import { userInsertSchema } from '@server/entities/user'
import userRouter from '..'

const db = await createTestDatabase()
const userRepository = db.getRepository(User)
const { signup } = userRouter.createCaller({ db })

it('should save a user', async () => {
  const userExpected = userInsertSchema.parse(fakeUsers[3])
  const response = await signup(fakeUsers[3])
  const userCreated = await userRepository.findOneOrFail({
    select: {
      id: true,
      email: true,
      password: true,
    },
    where: {
      email: userExpected.email,
    },
  })
  expect(userCreated).toMatchObject({
    id: expect.any(Number),
    email: userExpected.email,
    password: expect.not.stringContaining(userExpected.password),
  })

  expect(userCreated.password).toHaveLength(60)

  expect(response).toEqual({
    id: expect.any(Number),
    email: userExpected.email,
    name: userExpected.name,
    admin: userExpected.admin,
    phone: userExpected.phone,
  })

  expect(response.id).toEqual(userCreated!.id)
})

it('should require a valid email', async () => {
  await expect(
    signup({
      email: 'user-email-invalid',
      name: 'User',
      password: 'Password.123',
    })
  ).rejects.toThrow(/email/i)
})

it('should require a unique email', async () => {
  await signup({
    email: 'duplicate@email.com',
    name: 'User',
    password: 'Password.123',
  })
  await expect(
    signup({
      email: 'duplicate@email.com',
      name: 'User',
      password: 'Password.123',
    })
  ).rejects.toThrow(/email/i)
})

it('should require a password with at least 6 characters', async () => {
  await expect(
    signup({
      email: 'user2@domain.com',
      name: 'User',
      password: 'pP123',
    })
  ).rejects.toThrow(/password/i)
})

it('should require a password with an Uppercase character', async () => {
  await expect(
    signup({
      email: 'user2@domain.com',
      name: 'User',
      password: 'p1234567',
    })
  ).rejects.toThrow(/Uppercase/i)
})

it('should require a password with a Lowercase character', async () => {
  await expect(
    signup({
      email: 'user2@domain.com',
      name: 'User',
      password: 'P1234567',
    })
  ).rejects.toThrow(/Lowercase/i)
})

it('should require a password with a digit', async () => {
  await expect(
    signup({
      email: 'user2@domain.com',
      name: 'User',
      password: 'Password',
    })
  ).rejects.toThrow(/digit/i)
})

it('stores lowercased email', async () => {
  const user = fakeUsers[1]
  await signup({
    ...user,
    email: user.email.toUpperCase(),
  })

  await expect(
    userRepository.findOneByOrFail({
      email: user.email.toLowerCase(),
    })
  ).resolves.not.toBeNull()
})

it('stores email with trimmed whitespace', async () => {
  const user = fakeUsers[2]
  await signup({
    ...user,
    email: ` \t ${user.email}\t `,
  })

  await expect(
    userRepository.findOneByOrFail({
      email: user.email,
    })
  ).resolves.not.toBeNull()
})
