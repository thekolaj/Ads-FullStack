import { publicProcedure } from '@server/trpc'
import { createFakeEntries } from '@server/entities/test/fixtures'

export default publicProcedure.mutation(async ({ ctx: { db } }) => {
  await db.query(`TRUNCATE public.user, public.category RESTART IDENTITY CASCADE;`)
  return createFakeEntries(db)
})
