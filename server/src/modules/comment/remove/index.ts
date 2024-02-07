import { Comment, commentSchema } from '@server/entities/comment'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { TRPCError } from '@trpc/server'

export default authenticatedProcedure
  .input(commentSchema.pick({ id: true }))
  .mutation(async ({ input: { id }, ctx: { authUser, db } }) => {
    const commentRepository = db.getRepository(Comment)
    const comment = await commentRepository.findOneByOrFail({ id })

    if (!authUser.admin || comment.userId !== authUser.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'No access to delete this comment',
      })
    }
    return db.getRepository(Comment).delete(id)
  })
