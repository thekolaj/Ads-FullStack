import { hashPass } from '@server/utils/hashPass'
import type { Database } from '@server/database'
import { Ad, Category, Comment, User } from '..'

export const fakeUsers = [
  {
    email: 'admin@admin.com',
    password: 'Admin123',
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
    password: '4Kdoic9342icw93-34',
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
  { title: 'Adult' },
  { title: 'Education' },
  { title: 'Electronics' },
  { title: 'Entertainment' },
  { title: 'Fashion' },
  { title: 'Food' },
  { title: 'Health' },
  { title: 'Home' },
  { title: 'Transport' },
  { title: 'Travel' },
]

export const fakeAd = {
  title: 'new ad',
  text: 'new text',
  price: null,
  images: [],
  categories: [],
}

export const fakeAds = [
  {
    title: 'Good Ad',
    text: 'Buy this now',
    images: [{ url: 'https://t.ly/' }, { url: 'https://t.ly/' }],
  },
  { title: 'Bad Ad', text: 'Buy this later', price: 1, images: [{ url: 'https://t.ly/' }] },
  { title: 'Minimal Ad', text: 'Short' },
  { title: 'Last Ad', text: "Don't buy this at all", price: 22.22 },
  {
    title: 'Painting from my grandmother',
    text: 'Classic painting of a meme',
    price: 500,
    images: [
      {
        url: 'https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/2/naughty-japanese-dog-jing-kong.jpg',
      },
    ],
  },
  {
    title: 'Old broken mouse',
    text: 'Old broken mouse. For parts only.',
    price: 5.99,
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Old_Computer_Mouse.jpg/768px-Old_Computer_Mouse.jpg',
      },
    ],
  },
]

export async function createFakeUsers(db: Database) {
  return Promise.all(
    fakeUsers.map(async (user) => {
      const hash = await hashPass(user.password)
      const { password, ...newUser } = await db
        .getRepository(User)
        .save({ ...user, password: hash })
      return newUser
    })
  )
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

// Test make assumptions about what AD contains what and in what order then are returned.
// Changing things here might break some test
export async function createFakeEntries(db: Database) {
  const users = await createFakeUsers(db)
  const categories = await createFakeCategories(db)
  const ads = await db.getRepository(Ad).save([
    { ...fakeAds[0], userId: users[0].id, categories: [categories[1], categories[2]] },
    { ...fakeAds[1], userId: users[1].id, categories: [categories[3]] },
    { ...fakeAds[2], userId: users[2].id },
    {
      ...fakeAds[3],
      userId: users[2].id,
      categories: [categories[2], categories[3], categories[4]],
    },
    { ...fakeAds[4], userId: users[1].id },
    { ...fakeAds[5], userId: users[1].id },
  ])
  ads[1].comments = await createFakeComments(ads[1].id, users, db)
  ads[2].comments = await createFakeComments(ads[2].id, users, db)
  return { users, categories, ads }
}
