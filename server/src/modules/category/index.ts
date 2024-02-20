import { router } from '@server/trpc'
import list from './list'
import remove from './remove'
import upsert from './upsert'
import get from './get'

export default router({ upsert, list, remove, get })
