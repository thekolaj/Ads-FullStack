import { createTestDatabase } from '@tests/utils/database'
import { createFakeCategories } from '@server/entities/test/fixtures'
import categoryRouter from '..'

const db = await createTestDatabase()
const { get } = categoryRouter.createCaller({ db })
const fakeCategories = await createFakeCategories(db)

it('returns a category', async () => {
  const category = await get({ id: fakeCategories[0].id })
  expect(category).toEqual(fakeCategories[0])
})

it('require an existing id', async () => {
  await expect(get({ id: 9876 })).rejects.toThrow(/id/i)
})
