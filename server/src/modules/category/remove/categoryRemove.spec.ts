import { createTestDatabase } from '@tests/utils/database'
import { authContext } from '@tests/utils/context'
import { Category, Ad } from '@server/entities'
import { createFakeEntries } from '@server/entities/test/fixtures'
import categoryRouter from '..'

const db = await createTestDatabase()
const fakeEntries = await createFakeEntries(db)
const categoryRepository = db.getRepository(Category)

describe('as admin', async () => {
  const { remove } = categoryRouter.createCaller(authContext({ db }, { id: 1, admin: true }))
  it('should remove a category', async () => {
    await expect(categoryRepository.count()).resolves.toBe(fakeEntries.categories.length)
    await remove(fakeEntries.categories[9])
    await expect(categoryRepository.count()).resolves.toBe(fakeEntries.categories.length - 1)
  })

  it('should remove a category from ad relations', async () => {
    const adRepository = db.getTreeRepository(Ad)
    const adSearchParams = {
      relations: { categories: true },
      where: { title: 'Good Ad' },
    }
    const adWithCategories = await adRepository.findOneOrFail(adSearchParams)
    expect(adWithCategories.categories).toHaveLength(2)

    await remove(adWithCategories.categories[0])

    const adWithLessCategories = await adRepository.findOneOrFail(adSearchParams)
    expect(adWithLessCategories.categories).toHaveLength(1)
  })
})

it('should reject non-admin', async () => {
  const { remove } = categoryRouter.createCaller(authContext({ db }, { id: 2, admin: false }))
  await expect(remove(fakeEntries.categories[9])).rejects.toThrow(/admin/i)
})
