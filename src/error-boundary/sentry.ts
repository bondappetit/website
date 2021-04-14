import * as SentryReact from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import { config } from 'src/config';

export const Sentry = {
  options: (): SentryReact.BrowserOptions => ({
    dsn: config.SENTRY,
    environment: config.ENV,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,

    beforeSend(event) {
      if (!config.IS_LOCAL) {
        return null;
      }

      return event;
    }
  }),

  init: () => {
    SentryReact.init(Sentry.options());
  },

  log: (err: Error, extra?: Record<string, unknown>) => {
    SentryReact.withScope((scope) => {
      if (extra) {
        scope.setExtras(extra);
      }

      SentryReact.captureException(err);
    });
  }
};
