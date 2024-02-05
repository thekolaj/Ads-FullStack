import { fakeUsers } from '@server/entities/test/fixtures'
import { authUserSchema, type AuthUser } from '@server/entities/user'
import type { Context, ContextMinimal } from '@server/trpc'

export const requestContext = (
  context: Partial<Context> & ContextMinimal
): Context => ({
  req: {
    header: () => undefined,
    get: () => undefined,
  } as any,
  res: {
    cookie: () => undefined,
  } as any,
  ...context,
})

export const authContext = (
  context: Partial<Context> & ContextMinimal,
  user: AuthUser = fakeUsers[1]
): Context => ({
  authUser: authUserSchema.parse(user),
  ...context,
})
