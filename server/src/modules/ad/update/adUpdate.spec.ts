import { createTestDatabase } from '@tests/utils/database'
import { createFakeEntries, fakeAd } from '@server/entities/test/fixtures'
import { authContext } from '@tests/utils/context'
import { Ad, Image } from '@server/entities'
import categoryRouter from '..'

const db = await createTestDatabase()
const fakeEntries = await createFakeEntries(db)
const adRepository = db.getRepository(Ad)
const imageRepository = db.getRepository(Image)

const { update, create } = categoryRouter.createCaller(authContext({ db }, fakeEntries.users[0]))

it('updates an ad', async () => {
  const newAd = await create(fakeAd)
  const updates = { title: 'updated title', text: 'updated text' }
  const response = await update({ ...newAd, ...updates })
  const ad = await adRepository.findOneOrFail({
    relations: {
      images: true,
      categories: true,
    },
    where: { id: response.id },
  })
  expect(ad).toMatchObject({ id: newAd.id, ...fakeAd, ...updates })
})

it('adds an image to database', async () => {
  const newAd = await create(fakeAd)
  const imageCount = await imageRepository.count()
  const updates = { images: [{ url: 'https://t.ly/' }] }
  const response = await update({ ...newAd, ...updates })
  const ad = await adRepository.findOneOrFail({
    relations: {
      images: true,
      categories: true,
    },
    where: { id: response.id },
  })
  expect(ad).toMatchObject({ id: newAd.id, ...fakeAd, ...updates })
  expect(imageRepository.count()).resolves.toBe(imageCount + 1)
})

it('removes an image from database', async () => {
  const newAd = await create({ ...fakeAd, images: [{ url: 'https://t.ly/' }] })
  const imageCount = await imageRepository.count()
  const updates = { images: [] }
  const response = await update({ ...newAd, ...updates })
  const ad = await adRepository.findOneOrFail({
    relations: {
      images: true,
      categories: true,
    },
    where: { id: response.id },
  })
  expect(ad).toMatchObject({ id: newAd.id, ...fakeAd, ...updates })
  expect(imageRepository.count()).resolves.toBe(imageCount - 1)
})

it('update existing image in database', async () => {
  const newAd = await create({ ...fakeAd, images: [{ url: 'https://t.ly/' }] })
  const imageCount = await imageRepository.count()
  const updates = { images: [{ id: newAd.images[0].id, url: 'https://new.ly/' }] }
  const response = await update({ ...newAd, ...updates })
  const ad = await adRepository.findOneOrFail({
    relations: {
      images: true,
      categories: true,
    },
    where: { id: response.id },
  })
  expect(ad).toMatchObject({ id: newAd.id, ...fakeAd, ...updates })
  expect(imageRepository.count()).resolves.toBe(imageCount)
})

it('adds a category', async () => {
  const newAd = await create({ ...fakeAd })
  const updates = { categories: [fakeEntries.categories[0]] }
  const response = await update({ ...newAd, ...updates })
  const ad = await adRepository.findOneOrFail({
    relations: {
      images: true,
      categories: true,
    },
    where: { id: response.id },
  })
  expect(ad.categories).toHaveLength(1)
  expect(ad).toMatchObject({ id: newAd.id, ...fakeAd, ...updates })
})

it('removes a category', async () => {
  const newAd = await create({ ...fakeAd, categories: [fakeEntries.categories[0]] })
  const updates = { categories: [] }
  const response = await update({ ...newAd, ...updates })
  const ad = await adRepository.findOneOrFail({
    relations: {
      images: true,
      categories: true,
    },
    where: { id: response.id },
  })
  expect(ad.categories).toHaveLength(0)
  expect(ad).toMatchObject({ id: newAd.id, ...fakeAd, ...updates })
})

it('rejects user that does not own the ad', async () => {
  const { update: badUpdate } = categoryRouter.createCaller(
    authContext({ db }, { id: 999, admin: false })
  )
  const newAd = await create({ ...fakeAd })

  await expect(badUpdate(newAd)).rejects.toThrow(/access/i)
})
