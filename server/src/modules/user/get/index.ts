import { publicProcedure } from '@server/trpc'
import { User, userSchema } from '@server/entities/user'

export default publicProcedure
  .input(userSchema.pick({ id: true }))
  .query(async ({ input: { id }, ctx: { db } }) => {
    const { password, ads, comments, ...user } = await db
      .getRepository(User)
      .findOneByOrFail({ id })
    return user
  })
