import { router } from '@server/trpc'
import list from './list'
import remove from './remove'
import upsert from './upsert'

export default router({ upsert, list, remove })
