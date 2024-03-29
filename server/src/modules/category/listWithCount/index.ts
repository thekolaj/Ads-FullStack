import { publicProcedure } from '@server/trpc'
import { Category } from '@server/entities/category'

export default publicProcedure.query(async ({ ctx: { db } }) => {
  const categories = await db.getRepository(Category).find({
    relations: {
      ads: true,
    },
    order: {
      title: 'ASC',
    },
  })
  // return category id, name, and how many ADs each category has.
  return categories.map((category) => ({
    adCount: category.ads.length,
    id: category.id,
    title: category.title,
  }))
})
