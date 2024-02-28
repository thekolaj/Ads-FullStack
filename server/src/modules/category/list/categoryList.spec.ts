import { createTestDatabase } from '@tests/utils/database'
import { createFakeEntries } from '@server/entities/test/fixtures'
import categoryRouter from '..'

const db = await createTestDatabase()

it('returns a list of categories', async () => {
  const fakeEntries = await createFakeEntries(db)
  const { list } = categoryRouter.createCaller({ db })
  const categories = await list()

  expect(categories).toEqual(fakeEntries.categories)
})
