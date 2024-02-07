import { publicProcedure } from '@server/trpc'
import { Ad, adSearchSchema } from '@server/entities/ad'
import { Category } from '@server/entities/category'

const relations = {
  images: true,
  categories: true,
}

export default publicProcedure
  .input(adSearchSchema)
  .query(async ({ input: { categoryId: id, userId }, ctx: { db } }) => {
    if (id)
      return db
        .getRepository(Category)
        .find({ relations: { ads: relations }, where: { id } })

    return db.getRepository(Ad).find({ relations, where: { userId } })
  })
