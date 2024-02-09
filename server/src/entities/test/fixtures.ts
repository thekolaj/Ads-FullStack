import { appRouter } from '@server/modules'
import type { Database } from '@server/database'
import { Ad, Category, Comment } from '..'

export const fakeUsers = [
  {
    email: 'admin@admin.com',
    password: 'admin123',
    name: 'admin',
    phone: '+123456',
    admin: true,
  },
  {
    email: 'first@user.org',
    password: 'Password321',
    name: 'first!',
    phone: '+934502234',
    admin: false,
  },
  {
    email: 'second@friend.io',
    password: '123PassPls',
    name: 'Second User',
    phone: '+22222222222',
    admin: false,
  },
  {
    email: 'LastOne@latest.end',
    password: '4kdoic9342icw93-34',
    name: 'FriendlyUser',
    admin: false,
  },
]

const fakeComments = [
  { text: 'Great product' },
  { text: "I don't like this" },
  { text: 'Cured my grandmother' },
  { text: 'Scam!' },
]

const fakeCategories = [
  { title: 'Automotive' },
  { title: 'Real Estate' },
  { title: 'Fashion & Apparel' },
  { title: 'Electronics & Gadgets' },
  { title: 'Home & Garden' },
  { title: 'Health & Wellness' },
  { title: 'Travel & Tourism' },
  { title: 'Food & Beverage' },
  { title: 'Entertainment & Events' },
  { title: 'Education & Learning' },
]

export const fakeAds = [
  {
    title: 'Good Ad',
    text: 'Buy this now',
    images: [{ url: 'https://t.ly/' }, { url: 'https://t.ly/' }],
  },
  { title: 'Bad Ad', text: 'Buy this later', price: 1, images: [{ url: 'https://t.ly/' }] },
  { title: 'Minimal Ad', text: 'Short' },
  { title: 'Last Ad', text: "Don't buy this at all", price: 22.22 },
]

export async function createFakeUsers(db: Database) {
  const {
    user: { signup },
  } = appRouter.createCaller({ db })
  return Promise.all(fakeUsers.map(async (user) => signup(user)))
}

export async function createFakeCategories(db: Database) {
  return db.getRepository(Category).save(fakeCategories)
}

type FakeUsers = {
  email: string
  name: string
  id: number
  phone: string | null
  admin: boolean
}[]

export async function createFakeComments(adId: number, users: FakeUsers, db: Database) {
  return db.getRepository(Comment).save([
    { adId, userId: users[0].id, ...fakeComments[0] },
    { adId, userId: users[1].id, ...fakeComments[1] },
    { adId, userId: users[2].id, ...fakeComments[2] },
    { adId, userId: users[3].id, ...fakeComments[3] },
  ])
}

export async function createFakeEntries(db: Database) {
  const users = await createFakeUsers(db)
  const categories = await createFakeCategories(db)
  const ads = await db.getRepository(Ad).save([
    { ...fakeAds[0], userId: users[0].id, categories: [categories[1], categories[2]] },
    { ...fakeAds[1], userId: users[1].id, categories: [categories[3]] },
    { ...fakeAds[2], userId: users[2].id },
    {
      ...fakeAds[3],
      userId: users[3].id,
      categories: [categories[2], categories[3], categories[4]],
    },
  ])
  ads[1].comments = await createFakeComments(ads[1].id, users, db)
  ads[2].comments = await createFakeComments(ads[2].id, users, db)
  return { users, categories, ads }
}
