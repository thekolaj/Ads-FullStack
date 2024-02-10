import { createTestDatabase } from '@tests/utils/database'
import { createFakeEntries } from '@server/entities/test/fixtures'
import { authContext } from '@tests/utils/context'
import { Ad, Image, Comment } from '@server/entities'
import categoryRouter from '..'

const db = await createTestDatabase()
const fakeEntries = await createFakeEntries(db)
const adRepository = db.getRepository(Ad)
const imageRepository = db.getRepository(Image)
const commentRepository = db.getRepository(Comment)

it('removes the ad', async () => {
  const ad = await adRepository.findOneByOrFail({ title: 'Last Ad' })
  const { remove } = categoryRouter.createCaller(
    authContext({ db }, { id: ad.userId, admin: false })
  )
  expect(adRepository.count()).resolves.toBe(fakeEntries.ads.length)
  await remove({ id: ad.id })
  expect(adRepository.count()).resolves.toBe(fakeEntries.ads.length - 1)
})

it('removes images from database when removing the ad', async () => {
  const ad = await adRepository.findOneByOrFail({ title: 'Good Ad' })
  const { remove } = categoryRouter.createCaller(
    authContext({ db }, { id: ad.userId, admin: false })
  )
  const imageCount = await imageRepository.count()
  await remove({ id: ad.id })
  expect(imageRepository.count()).resolves.toBe(imageCount - 2)
})

it('removes comments from database when removing the ad', async () => {
  const ad = await adRepository.findOneByOrFail({ title: 'Minimal Ad' })
  const { remove } = categoryRouter.createCaller(
    authContext({ db }, { id: ad.userId, admin: false })
  )
  const commentCount = await commentRepository.count()
  await remove({ id: ad.id })
  expect(commentRepository.count()).resolves.toBe(commentCount - 4)
})

it('rejects user that does not own the ad', async () => {
  const ad = await adRepository.findOneByOrFail({ title: 'Bad Ad' })
  const { remove } = categoryRouter.createCaller(authContext({ db }, { id: 999, admin: false }))
  await expect(remove({ id: ad.id })).rejects.toThrow(/access/i)
})
