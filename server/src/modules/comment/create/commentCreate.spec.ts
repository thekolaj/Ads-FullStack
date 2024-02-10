import { createTestDatabase } from '@tests/utils/database'
import { createFakeEntries } from '@server/entities/test/fixtures'
import { authContext } from '@tests/utils/context'
import { Comment } from '@server/entities'
import categoryRouter from '..'

const db = await createTestDatabase()
const fakeEntries = await createFakeEntries(db)
const commentRepository = db.getRepository(Comment)
const { create } = categoryRouter.createCaller(authContext({ db }, fakeEntries.users[0]))

it('creates a comment on an ad', async () => {})

it('requires an existing ad', async () => {})
