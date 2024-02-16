import { router } from '../trpc'
import ad from './ad'
import category from './category'
import comment from './comment'
import user from './user'
import reset from './resetPreview'

export const appRouter = router({ ad, category, comment, user, reset })

export type AppRouter = typeof appRouter
