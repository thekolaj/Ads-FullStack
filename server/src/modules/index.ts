import { router } from '../trpc'
import ad from './ad'
import category from './category'
import comment from './comment'
import user from './user'

export const appRouter = router({ ad, category, comment, user })

export type AppRouter = typeof appRouter
