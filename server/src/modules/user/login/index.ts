import bcrypt from 'bcrypt'
import config from '@server/config'
import jsonwebtoken from 'jsonwebtoken'
import { publicProcedure } from '@server/trpc'
import { TRPCError } from '@trpc/server'
import { User, userSchema } from '@server/entities/user'
import { prepareTokenPayload } from '../tokenPayload'

const { expiresIn, tokenKey } = config.auth

export default publicProcedure
  .input(userSchema.pick({ email: true, password: true }))
  .mutation(async ({ input: { email, password }, ctx: { db } }) => {
    const user = (await db.getRepository(User).findOne({
      select: { id: true, password: true, admin: true },
      where: { email },
    })) as Pick<User, 'id' | 'password' | 'admin'> | undefined

    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'We could not find an account with this email address',
      })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Incorrect password. Try again.',
      })
    }

    const payload = prepareTokenPayload(user)

    const accessToken = jsonwebtoken.sign(payload, tokenKey, { expiresIn })

    return {
      accessToken,
    }
  })
