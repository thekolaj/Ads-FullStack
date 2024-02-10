import { Ad, adSchema } from '@server/entities/ad'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { TRPCError } from '@trpc/server'

export default authenticatedProcedure
  .input(adSchema.pick({ id: true }))
  .mutation(async ({ input: { id }, ctx: { authUser, db } }) => {
    const adRepository = db.getRepository(Ad)
    const ad = await adRepository.findOneByOrFail({ id })

    if (!authUser.admin && ad.userId !== authUser.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'No access to delete this ad',
      })
    }
    return adRepository.delete(id)
  })
