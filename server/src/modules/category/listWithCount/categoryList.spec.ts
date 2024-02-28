import { createTestDatabase } from '@tests/utils/database'
import { createFakeEntries } from '@server/entities/test/fixtures'
import categoryRouter from '..'

const db = await createTestDatabase()

it('returns a list of categories with their ad count', async () => {
  const fakeEntries = await createFakeEntries(db)
  const { listWithCount } = categoryRouter.createCaller({ db })
  const categories = await listWithCount()

  expect(categories).toHaveLength(fakeEntries.categories.length)
  expect(categories.find((entry) => entry.id === fakeEntries.categories[1].id)?.adCount).toBe(1)
})
