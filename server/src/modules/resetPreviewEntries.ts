import { publicProcedure } from '@server/trpc'
import { createFakeEntries } from '@server/entities/test/fixtures'
import logger from '../logger'

export default publicProcedure.mutation(async ({ ctx: { db } }) => {
  await db.query(`TRUNCATE public.user, public.category RESTART IDENTITY CASCADE;`)
  logger.warn('Database reset to defaults')
  return createFakeEntries(db)
})
