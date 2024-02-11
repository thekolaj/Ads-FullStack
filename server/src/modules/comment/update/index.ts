import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { Comment, commentUpdateSchema } from '@server/entities/comment'
import { TRPCError } from '@trpc/server'

export default authenticatedProcedure
  .input(commentUpdateSchema)
  .mutation(async ({ input: { id, text }, ctx: { authUser, db } }) => {
    const commentRepository = db.getRepository(Comment)
    const comment = await commentRepository.findOneByOrFail({ id })

    if (!authUser.admin && comment.userId !== authUser.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'No access to this comment',
      })
    }

    return commentRepository.save({ id, text })
  })
