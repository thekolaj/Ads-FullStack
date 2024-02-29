import { publicProcedure } from '@server/trpc'
import { Ad, adSearchSchema } from '@server/entities/ad'

export default publicProcedure
  .input(adSearchSchema)
  .query(async ({ input: { categoryId, userId, pagination } = {}, ctx: { db } }) => {
    let query = db
      .getRepository(Ad)
      .createQueryBuilder('ad')
      .leftJoinAndSelect('ad.images', 'images')
      .leftJoinAndSelect('ad.categories', 'categories')
      // Bug: `orderBy` column name must be camelCase when used with `take` or `skip`
      .orderBy('ad.updatedAt', 'DESC')

    // Conditional WHERE clauses depend on parameters passed in.
    if (categoryId) query = query.andWhere('categories.id = :categoryId', { categoryId })
    // column name bust be snake_case in `where`
    if (userId) query = query.andWhere('user_id = :userId', { userId })

    const totalCount = await query.getCount()

    // Optional pagination
    if (pagination) {
      query = query.skip((pagination.page - 1) * pagination.take).take(pagination.take)
    }

    const ads = await query.getMany()

    return { totalCount, ads }
  })
