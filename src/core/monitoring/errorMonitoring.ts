/* eslint-disable import/no-extraneous-dependencies */

import * as Sentry from '@sentry/react-native';
import { CaptureContext } from '@sentry/types';

import { config } from '$core/constants';

import { tags } from './constants';

import { Primitives } from '$types';

const prodSampleRate = 0.05;
const fullSampleRate = 1;

export const routingInstrumentation =
  new Sentry.ReactNavigationInstrumentation();

class ErrorMonitoringClass {
  /* ***** *****  Setup  ***** ***** */

  init() {
    const sampleRate =
      config.env === 'production' ? prodSampleRate : fullSampleRate;
    const isEnabled = config.env !== 'development' && !config.isDebug;

    if (!config.sentryDsn) {
      return;
    }

    Sentry.init({
      dsn: config.sentryDsn,
      tracesSampleRate: sampleRate,
      enabled: isEnabled,
      environment: config.env,
      debug: config.isDebug,
      integrations: [
        new Sentry.ReactNativeTracing({
          tracingOrigins: ['localhost', 'codepushupdates.azureedge.net', /^\//],
          routingInstrumentation,
        }),
      ],
    });

    this.tag(tags.codepush, config.codePush);
  }

  /* ***** *****  User related  ***** ***** */

  setUser(user: Sentry.User) {
    Sentry.setUser(user);
  }

  clearUser() {
    Sentry.configureScope((scope) => scope.setUser(null));
  }

  /* ***** *****  Monitoring  ***** ***** */

  event(event: Sentry.Event) {
    Sentry.captureEvent(event);
  }

  exception(exception: unknown) {
    Sentry.captureException(exception);
  }

  message(message: string, context?: CaptureContext | Sentry.Severity) {
    Sentry.captureMessage(message, context);
  }

  tag(key: string, value: Primitives) {
    Sentry.setTag(key, value);
  }

  context(name: string, context: Record<string, unknown> | null) {
    Sentry.setContext(name, context);
  }

  breadcrumbs(breadcrumb: Sentry.Breadcrumb) {
    Sentry.addBreadcrumb(breadcrumb);
  }

  scope(callback: (scope: Sentry.Scope) => void) {
    Sentry.withScope(callback);
  }
}

const ErrorMonitoring = new ErrorMonitoringClass();

export * from '@sentry/react-native';
export default ErrorMonitoring;
