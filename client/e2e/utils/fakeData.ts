import { Chance } from 'chance'

export const random = process.env.CI ? Chance(1) : Chance()

export const fakeUser = () => ({
  email: random.email(),
  password: 'Password.123',
  name: random.name(),
  phone: random.phone(),
})

export const fakeAd = () => ({
  title: random.sentence({ words: 5 }),
  text: random.sentence({ words: 10 }),
  price: random.floating({ min: 1, max: 9999999, fixed: 2 }).toString(),
  url: 'http://localhost:5173/src/assets/noImage.png',
})
