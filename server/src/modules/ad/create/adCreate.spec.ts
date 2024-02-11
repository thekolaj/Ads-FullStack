import { createTestDatabase } from '@tests/utils/database'
import { createFakeEntries, fakeAd } from '@server/entities/test/fixtures'
import { authContext } from '@tests/utils/context'
import { Ad } from '@server/entities'
import categoryRouter from '..'

const db = await createTestDatabase()
const fakeEntries = await createFakeEntries(db)
const adRepository = db.getRepository(Ad)
const { create } = categoryRouter.createCaller(authContext({ db }, fakeEntries.users[0]))

it('saves a valid ad with minimal input', async () => {
  const { title, text } = fakeAd
  const response = await create({ title, text })
  const ad = await adRepository.findOneOrFail({
    relations: {
      images: true,
      categories: true,
    },
    where: { id: response.id },
  })

  expect(ad).toMatchObject(fakeAd)
})

it('saves a valid ad with price', async () => {
  const newAd = { ...fakeAd, price: 9.99 }
  const response = await create(newAd)
  const ad = await adRepository.findOneOrFail({
    relations: {
      images: true,
      categories: true,
    },
    where: { id: response.id },
  })
  expect(ad).toMatchObject(newAd)
})

it('saves a valid ad with images', async () => {
  const newAd = { ...fakeAd, images: [{ url: 'https://imgs.xkcd.com/comics/sandwich.png' }] }
  const response = await create(newAd)
  const ad = await adRepository.findOneOrFail({
    relations: {
      images: true,
      categories: true,
    },
    where: { id: response.id },
  })
  expect(ad).toMatchObject(newAd)
})

it('saves a valid ad with category id', async () => {
  const newAd = { ...fakeAd, categories: [{ id: fakeEntries.categories[0].id }] }
  const response = await create(newAd)
  const ad = await adRepository.findOneOrFail({
    relations: {
      images: true,
      categories: true,
    },
    where: { id: response.id },
  })
  expect(ad).toMatchObject(newAd)
})

it('requires a valid image url', async () => {
  await expect(create({ ...fakeAd, images: [{ url: 'badUrl' }] })).rejects.toThrow(/url/i)
})

it('requires an existing category', async () => {
  await expect(create({ ...fakeAd, categories: [{ id: 9999 }] })).rejects.toThrow(/category/i)
})
