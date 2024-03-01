import { publicProcedure } from '@server/trpc'

export default publicProcedure.mutation(async () => {
  throw new Error(`Test Back-end Error: ${new Date().toISOString()}`)
})
