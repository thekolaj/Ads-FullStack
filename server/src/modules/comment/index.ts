import { router } from '@server/trpc'
import create from './create'
import remove from './remove'
import update from './update'

export default router({ remove, create, update })
