import { Category, categoryUpsertSchema } from '@server/entities/category'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { TRPCError } from '@trpc/server'

export default authenticatedProcedure
  .input(categoryUpsertSchema)
  .mutation(async ({ input: categoryData, ctx: { authUser, db } }) => {
    if (!authUser.admin) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Admin only',
      })
    }
    return db.getRepository(Category).save(categoryData)
  })
