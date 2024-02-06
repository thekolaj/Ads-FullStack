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
  user: AuthUser = { id: 1, admin: false }
): Context => ({
  authUser: authUserSchema.parse(user),
  ...context,
})
