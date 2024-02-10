import { createTestDatabase } from '@tests/utils/database'
import { createFakeEntries, fakeAds } from '@server/entities/test/fixtures'
import categoryRouter from '..'

const db = await createTestDatabase()
const fakeEntries = await createFakeEntries(db)
const { detail } = categoryRouter.createCaller({ db })

it('return and add with user and comments', async () => {
  const ad = await detail({ id: fakeEntries.ads[1].id })

  expect(ad).toMatchObject(fakeAds[1])
  expect(ad).toHaveProperty('user.name')
  expect(ad).toHaveProperty('comments[0].text')
  expect(ad).toHaveProperty('comments[0].user.name')
})

it('require an existing id', async () => {
  await expect(detail({ id: 9876 })).rejects.toThrow(/id/i)
})
