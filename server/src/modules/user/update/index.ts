import { User, userUpdateSchema } from '@server/entities/user'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { TRPCError } from '@trpc/server'

export default authenticatedProcedure
  .input(userUpdateSchema)
  .mutation(async ({ input: userData, ctx: { authUser, db } }) => {
    if (userData.id !== authUser.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Logged in user can only update himself',
      })
    }
    try {
      return await db.getRepository(User).save(userData)
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error
      }

      if (error.message.includes('duplicate key')) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'User with this email already exists',
        })
      }

      throw error
    }
  })
