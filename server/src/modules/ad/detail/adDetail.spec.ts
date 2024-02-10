import { createTestDatabase } from '@tests/utils/database'
import { createFakeEntries } from '@server/entities/test/fixtures'
import categoryRouter from '..'

const db = await createTestDatabase()
const fakeEntries = await createFakeEntries(db)
const { detail } = categoryRouter.createCaller({ db })

it('return and add', async () => {
  const ad = await detail({ id: fakeEntries.ads[1].id })
  expect(ad).toMatchObject(fakeEntries.ads[1])
  expect(ad).toHaveProperty('user.name')
  expect(ad).toHaveProperty('comments[0].text')
  expect(ad).toHaveProperty('comments[0].user.name')
})

it('require an existing id', async () => {
  await expect(detail({ id: 9876 })).rejects.toThrow(/id/i)
})
