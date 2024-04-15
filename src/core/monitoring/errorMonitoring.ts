import type { Event, Scope, User } from '@sentry/react-native';
import * as Sentry from '@sentry/react-native';
import type { Breadcrumb, CaptureContext, SeverityLevel } from '@sentry/types';

import { config } from '$core/constants';

import type { tags } from './constants';

import type { Primitives } from '$types';

const prodSampleRate = 0.5;
const fullSampleRate = 1;

export const routingInstrumentation =
  new Sentry.ReactNavigationInstrumentation();

class ErrorMonitoringClass {
  /* ***** *****  Setup  ***** ***** */

  init() {
    const sampleRate =
      config.env === 'production' ? prodSampleRate : fullSampleRate;
    const isEnabled = config.env !== 'development';

    if (!config.sentryDsn) {
      // eslint-disable-next-line no-console
      console.log('Failed to initialize Sentry - No DSN found');

      return;
    }

    Sentry.init({
      dsn: config.sentryDsn,
      debug: false,
      tracesSampleRate: sampleRate,
      enabled: isEnabled,
      environment: config.env,
      integrations: [
        new Sentry.ReactNativeTracing({
          routingInstrumentation,
        }),
      ],
      denyUrls: [/mixpanel.com/i, /flagsmith.com/i],
      beforeBreadcrumb(breadcrumb) {
        if (typeof breadcrumb.data?.url === 'string') {
          if (
            breadcrumb.data.url.match(/mixpanel.com/i) ??
            breadcrumb.data.url.match(/flagsmith.com/i)
          ) {
            return null;
          }
        }

        if (breadcrumb.category === 'console') {
          return null;
        }

        return breadcrumb;
      },
    });

    if (typeof config.runtimeVersion === 'string') {
      this.tag('runtimeVersion', config.runtimeVersion);
    }

    this.tag('version', config.version);
  }

  /* ***** *****  User related  ***** ***** */

  setUser(user: User) {
    Sentry.setUser(user);
  }

  clearUser() {
    Sentry.configureScope((scope) => scope.setUser(null));
  }

  /* ***** *****  Monitoring  ***** ***** */

  event(event: Event) {
    Sentry.captureEvent(event);
  }

  exception(exception: unknown) {
    Sentry.captureException(exception);
  }

  message(message: string, context?: CaptureContext | SeverityLevel) {
    Sentry.captureMessage(message, context);
  }

  tag(key: keyof typeof tags, value: Primitives) {
    Sentry.setTag(key, value);
  }

  context(name: string, context: Record<string, unknown> | null) {
    Sentry.setContext(name, context);
  }

  breadcrumbs(breadcrumb: Breadcrumb) {
    Sentry.addBreadcrumb(breadcrumb);
  }

  scope(callback: (scope: Scope) => void) {
    Sentry.withScope(callback);
  }
}

export const ErrorMonitoring = new ErrorMonitoringClass();
