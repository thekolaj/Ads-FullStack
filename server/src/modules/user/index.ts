import { router } from '@server/trpc'
import login from './login'
import signup from './signup'
import update from './update'
import get from './get'

export default router({ login, signup, update, get })
