import { publicProcedure } from '@server/trpc'
import { Ad, adSearchSchema } from '@server/entities/ad'

export default publicProcedure
  .input(adSearchSchema)
  .query(async ({ input: { categoryId, userId } = {}, ctx: { db } }): Promise<Ad[]> => {
    let query = db
      .getRepository(Ad)
      .createQueryBuilder('ad')
      .leftJoinAndSelect('ad.images', 'images')
      .leftJoinAndSelect('ad.categories', 'categories')

    if (categoryId) query = query.andWhere('categories.id = :categoryId', { categoryId })

    if (userId) query = query.andWhere('user_id = :userId', { userId })

    return query.getMany()
  })
