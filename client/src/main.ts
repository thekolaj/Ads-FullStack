import './assets/style.css'
import './assets/main.css'

import { createApp } from 'vue'
import * as Sentry from '@sentry/vue'
import { sentryDSN, apiOrigin } from '@/config'

import App from './App.vue'
import router from './router'

const app = createApp(App)

console.log(`Before start: ${sentryDSN} \n On: ${apiOrigin}`)
if (sentryDSN) {
  Sentry.init({
    app,
    dsn: sentryDSN,
    integrations: [
      Sentry.browserTracingIntegration({ router }),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions

    // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: [apiOrigin],

    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  })
  console.log(`Sentry running: ${sentryDSN} \n On: ${apiOrigin}`)
}

app.use(router)

app.mount('#app')
