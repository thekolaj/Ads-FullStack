import { router } from '@server/trpc'
import create from './create'
import detail from './detail'
import list from './list'
import remove from './remove'
import update from './update'

export default router({ create, detail, update, list, remove })
