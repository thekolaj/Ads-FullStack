import bcrypt from 'bcrypt'
import { publicProcedure } from '@server/trpc'
import config from '@server/config'
import { User, userInsertSchema } from '@server/entities/user'
import { TRPCError } from '@trpc/server'

export default publicProcedure
  .input(userInsertSchema)
  .mutation(async ({ input: { email, name, password }, ctx: { db } }) => {
    const hash = await bcrypt.hash(password, config.auth.passwordCost)

    try {
      const {
        password: pass,
        ads,
        comments,
        ...user
      } = await db.getRepository(User).save({ email, name, password: hash })
      // filter out pass, ads, and comments. Return everything else
      return user
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error
      }

      if (error.message.includes('duplicate key')) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'User with this email already exists',
        })
      }

      throw error
    }
  })
