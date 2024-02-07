import { Category, categorySchema } from '@server/entities/category'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { TRPCError } from '@trpc/server'

export default authenticatedProcedure
  .input(categorySchema.pick({ id: true }))
  .mutation(async ({ input: { id }, ctx: { authUser, db } }) => {
    if (!authUser.admin) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Admin only',
      })
    }
    return db.getRepository(Category).delete(id)
  })
