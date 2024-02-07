import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { Comment, commentInsertSchema } from '@server/entities/comment'

export default authenticatedProcedure
  .input(commentInsertSchema)
  .mutation(async ({ input: commentData, ctx: { authUser, db } }) =>
    db.getRepository(Comment).save({ userId: authUser.id, ...commentData })
  )
