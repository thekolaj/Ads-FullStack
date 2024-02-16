import { publicProcedure } from '@server/trpc'
import { createFakeEntries } from '@server/entities/test/fixtures'

export default publicProcedure.mutation(async ({ ctx: { db } }) => {
  await db.query(`truncate public.user, public.category restart identity cascade;`)
  await createFakeEntries(db)
  return 'Reset successful'
})
