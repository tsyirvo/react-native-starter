import * as Sentry from '@sentry/react-native';

import { config } from '$core/constants';

import { Primitives } from '$types';

const prodSampleRate = 0.05;
const fullSampleRate = 1;

class ErrorMonitoring {
  init() {
    const sampleRate =
      config.env === 'production' ? prodSampleRate : fullSampleRate;
    const isEnabled = config.env !== 'development' && !config.isDebug;

    Sentry.init({
      dsn: config.sentryDsn,
      tracesSampleRate: sampleRate,
      enabled: isEnabled,
      environment: config.env,
      debug: config.isDebug,
    });
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

  expeption(exception: unknown) {
    Sentry.captureException(exception);
  }

  message(message: string) {
    Sentry.captureMessage(message);
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
}

export default new ErrorMonitoring();
