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

const fakeAds = [
  {
    title: 'Good Ad',
    text: 'Buy this now',
    images: [{ url: 'https://t.ly/' }, { url: 'https://t.ly/' }],
  },
  { title: 'Bad Ad', text: 'Buy this later', price: 1, images: [{ url: 'https://t.ly/' }] },
  { title: 'Last Ad', text: "Don't buy this at all", price: 2.22 },
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

// export async function createFakeData(db: Database) {
//   return db.getRepository(Ad).save()
// }

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
