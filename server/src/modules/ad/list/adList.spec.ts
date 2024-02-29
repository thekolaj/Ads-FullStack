import { createTestDatabase } from '@tests/utils/database'
import { createFakeEntries } from '@server/entities/test/fixtures'
import categoryRouter from '..'

const db = await createTestDatabase()
const fakeEntries = await createFakeEntries(db)
const { list } = categoryRouter.createCaller({ db })

it('returns a list of all ads', async () => {
  const response = await list({})
  expect(response.ads).toHaveLength(fakeEntries.ads.length)
})

it('returns a list of all ads in category', async () => {
  const response = await list({ categoryId: fakeEntries.categories[2].id })
  expect(response.ads).toHaveLength(2)
})

it('returns a list of all ads by user', async () => {
  const response = await list({ userId: fakeEntries.users[2].id })
  expect(response.ads).toHaveLength(2)
})

it('returns a list of all ads in category by user', async () => {
  const response = await list({
    categoryId: fakeEntries.categories[2].id,
    userId: fakeEntries.users[2].id,
  })
  expect(response.ads).toHaveLength(1)
})

it('returns a paginated list of ads', async () => {
  const take = 2
  const response = await list({ pagination: { page: 2, take } })
  expect(response.totalCount).toBe(fakeEntries.ads.length)
  expect(response.ads).toHaveLength(take)
})
