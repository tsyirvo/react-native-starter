import type { Event, Scope, User } from '@sentry/react-native';
import type { Breadcrumb, CaptureContext, SeverityLevel } from '@sentry/types';
import * as Sentry from 'sentry-expo';

import { config } from '$core/constants';

import { tags } from './constants';

import type { Primitives } from '$types';

const prodSampleRate = 0.5;
const fullSampleRate = 1;

export const routingInstrumentation =
  new Sentry.Native.ReactNavigationInstrumentation();

class ErrorMonitoringClass {
  /* ***** *****  Setup  ***** ***** */

  init() {
    const sampleRate =
      config.env === 'production' ? prodSampleRate : fullSampleRate;
    const isEnabled = config.env !== 'development';

    if (!config.sentryDsn) {
      const errorMessage = 'Failed to initialize Sentry - No DSN found';

      console.log(errorMessage);

      return;
    }

    Sentry.init({
      dsn: config.sentryDsn,
      tracesSampleRate: sampleRate,
      enabled: isEnabled,
      enableInExpoDevelopment: false,
      environment: config.env,
      integrations: [
        new Sentry.Native.ReactNativeTracing({
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
    Sentry.Native.setUser(user);
  }

  clearUser() {
    Sentry.Native.configureScope((scope) => scope.setUser(null));
  }

  /* ***** *****  Monitoring  ***** ***** */

  event(event: Event) {
    Sentry.Native.captureEvent(event);
  }

  exception(exception: unknown) {
    Sentry.Native.captureException(exception);
  }

  message(message: string, context?: CaptureContext | SeverityLevel) {
    Sentry.Native.captureMessage(message, context);
  }

  tag(key: keyof typeof tags, value: Primitives) {
    Sentry.Native.setTag(key, value);
  }

  context(name: string, context: Record<string, unknown> | null) {
    Sentry.Native.setContext(name, context);
  }

  breadcrumbs(breadcrumb: Breadcrumb) {
    Sentry.Native.addBreadcrumb(breadcrumb);
  }

  scope(callback: (scope: Scope) => void) {
    Sentry.Native.withScope(callback);
  }
}

export const ErrorMonitoring = new ErrorMonitoringClass();
