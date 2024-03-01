import { router } from '../trpc'
import ad from './ad'
import category from './category'
import comment from './comment'
import user from './user'
import reset from './resetPreviewEntries'
import throwError from './throwError'

export const appRouter = router({ ad, category, comment, user, reset, throwError })

export type AppRouter = typeof appRouter
