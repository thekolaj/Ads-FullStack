import express from 'express'
import * as Sentry from '@sentry/node'
import {
  createExpressMiddleware,
  type CreateExpressContextOptions,
} from '@trpc/server/adapters/express'
import cors from 'cors'
import config from './config'
import logger from './logger'
import type { Database } from './database'
import { appRouter } from './modules'
import type { Context } from './trpc'

export default function createApp(db: Database) {
  const app = express()

  // Conditional Sentry if key is provided in ENV
  const { sentryDSN } = config
  if (sentryDSN) {
    Sentry.init({ dsn: sentryDSN })

    // The request handler must be the first middleware on the app
    app.use(Sentry.Handlers.requestHandler())
    logger.info('Sentry active')
  }

  app.use(cors())
  app.use(express.json())

  // Endpoint for health checks - pinging the server to see if it's alive.
  // This can be used by tests, load balancers, monitoring tools, etc.
  app.use('/api/health', (_, res) => {
    res.status(200).send('OK')
  })

  // Using TRPC router, which will live under /api/v1/trpc
  // path. It will be used for all our procedures.
  app.use(
    '/api/v1/trpc',
    createExpressMiddleware({
      // Created context for each request, which we will be able to
      // access in our procedures.
      createContext: ({ req, res }: CreateExpressContextOptions): Context => ({
        // What we provide to our procedures under `ctx` key.
        db,
        req,
        res,
      }),

      // all routes
      router: appRouter,
    })
  )

  if (sentryDSN) {
    // The error handler must be before any other error middleware and after all controllers
    app.use(Sentry.Handlers.errorHandler())
  }

  return app
}
