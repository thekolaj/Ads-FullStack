import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { Ad, adUpdateSchema } from '@server/entities/ad'
import { TRPCError } from '@trpc/server'

export default authenticatedProcedure
  .input(adUpdateSchema)
  .mutation(async ({ input: adData, ctx: { authUser, db } }) => {
    const adRepository = db.getRepository(Ad)
    const ad = await adRepository.findOneByOrFail({ id: adData.id })

    if (!authUser.admin && ad.userId !== authUser.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'No access to edit this ad',
      })
    }

    return adRepository.save(adData)
  })
