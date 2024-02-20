import { publicProcedure } from '@server/trpc'
import { Category, categorySchema } from '@server/entities/category'

export default publicProcedure
  .input(categorySchema.pick({ id: true }))
  .query(async ({ input: { id }, ctx: { db } }) => {
    const { ads, ...category } = await db.getRepository(Category).findOneByOrFail({ id })
    return category
  })
