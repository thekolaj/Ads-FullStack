import { createTestDatabase } from '@tests/utils/database'
import { authContext } from '@tests/utils/context'
import { Category } from '@server/entities'
import categoryRouter from '..'

const db = await createTestDatabase()
const categoryRepository = db.getRepository(Category)

describe('as admin', async () => {
  const { upsert } = categoryRouter.createCaller(
    authContext({ db }, { id: 1, admin: true })
  )
  it('should save a category', async () => {
    const category = { title: 'new category' }
    await upsert(category)
    const categoryCreated = await categoryRepository.findOneByOrFail(category)
    expect(categoryCreated).toEqual({ id: expect.any(Number), ...category })
  })

  it('should update a category', async () => {
    const category = { title: 'category1' }
    const response = await upsert(category)
    const categoryCreated = await categoryRepository.findOneByOrFail(category)
    categoryCreated.title = 'category2'
    await upsert(categoryCreated)
    const categoryUpdated = await categoryRepository.findOneByOrFail({
      id: response.id,
    })
    expect(categoryUpdated).toEqual(categoryCreated)
  })
  it('should reject a category with blank name', async () => {
    await expect(upsert({ title: '' })).rejects.toThrow(/title/i)
  })
})

it('should reject non-admin', async () => {
  const { upsert } = categoryRouter.createCaller(
    authContext({ db }, { id: 2, admin: false })
  )
  await expect(upsert({ title: 'Good title' })).rejects.toThrow(/admin/i)
})
