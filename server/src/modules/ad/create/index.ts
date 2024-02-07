import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { Ad, adInsertSchema } from '@server/entities/ad'

export default authenticatedProcedure
  .input(adInsertSchema)
  .mutation(async ({ input: adData, ctx: { authUser, db } }) =>
    db.getRepository(Ad).save({ userId: authUser.id, ...adData })
  )
