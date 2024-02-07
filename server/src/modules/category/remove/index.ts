import { Category, categorySchema } from '@server/entities/category'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { TRPCError } from '@trpc/server'

export default authenticatedProcedure
  .input(categorySchema)
  .mutation(async ({ input: categoryData, ctx: { authUser, db } }) => {
    if (!authUser.admin) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Admin only',
      })
    }
    return db.getRepository(Category).delete(categoryData)
  })
