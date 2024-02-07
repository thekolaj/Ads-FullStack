import type { AuthUser } from '@server/entities/user'
import z from 'zod'

const tokenPayloadSchema = z.object({
  user: z.object({
    id: z.number(),
    admin: z.boolean(),
  }),
})

type TokenPayload = z.infer<typeof tokenPayloadSchema>

/**
 * Prepares the token payload for the given user.
 * @param user The authenticated user.
 * @returns The token payload containing the user information.
 */
export function prepareTokenPayload(user: AuthUser): TokenPayload {
  return tokenPayloadSchema.parse({ user })
}
