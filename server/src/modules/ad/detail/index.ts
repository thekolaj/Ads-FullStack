import { publicProcedure } from '@server/trpc'
import { Ad, adSchema } from '@server/entities/ad'

export default publicProcedure
  .input(adSchema.pick({ id: true }))
  .query(async ({ input: { id }, ctx: { db } }) =>
    db.getRepository(Ad).findOneOrFail({
      relations: {
        user: true,
        images: true,
        categories: true,
        comments: { user: true },
      },
      where: { id },
    })
  )
