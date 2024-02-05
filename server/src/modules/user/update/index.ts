import { User, userUpdateSchema } from '@server/entities/user'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { TRPCError } from '@trpc/server'

export default authenticatedProcedure
  .input(userUpdateSchema)
  .mutation(async ({ input: userData, ctx: { authUser, db } }) => {
    if (userData.id !== authUser.id) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You can only change your own profile',
      })
    }

    return db.getRepository(User).save(userData)
  })
