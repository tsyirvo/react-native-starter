import type { Event, Scope, User } from '@sentry/react-native';
import type { Breadcrumb, CaptureContext, SeverityLevel } from '@sentry/types';
import * as Sentry from 'sentry-expo';

import { config } from '$core/constants';

import { errors, tags } from './constants';

import type { Primitives } from '$types';

const prodSampleRate = 0.05;
const fullSampleRate = 1;

export const routingInstrumentation =
  new Sentry.Native.ReactNavigationInstrumentation();

class ErrorMonitoringClass {
  /* ***** *****  Setup  ***** ***** */

  init() {
    const sampleRate =
      config.env === 'production' ? prodSampleRate : fullSampleRate;
    const isEnabled = config.env !== 'development' && !config.isDebug;

    if (!config.sentryDsn) {
      const errorMessage = `[${errors.sdk}]: Failed to initialize Sentry - No DSN found`;

      console.log(errorMessage);

      return;
    }

    Sentry.init({
      dsn: config.sentryDsn,
      tracesSampleRate: sampleRate,
      enabled: isEnabled,
      enableInExpoDevelopment: false,
      environment: config.env,
      debug: config.isDebug,
      integrations: [
        new Sentry.Native.ReactNativeTracing({
          routingInstrumentation,
        }),
      ],
    });

    if (typeof config.runtimeVersion === 'string') {
      this.tag('runtimeVersion', config.runtimeVersion);
    }

    this.tag('currentVersion', config.version);
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

const ErrorMonitoring = new ErrorMonitoringClass();

export default ErrorMonitoring;
