import { router } from '@server/trpc'
import login from './login'
import signup from './signup'
import update from './update'

export default router({ login, signup, update })
