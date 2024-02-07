import { publicProcedure } from '@server/trpc'
import { Category } from '@server/entities/category'

export default publicProcedure.query(async ({ ctx: { db } }) =>
  db
    .getRepository(Category)
    .createQueryBuilder('category')
    .loadRelationCountAndMap('category.ads', 'ads')
    .orderBy('category.title')
    .getMany()
)
