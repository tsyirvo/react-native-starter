import type { Event, Scope } from '@sentry/react-native';
import * as Sentry from '@sentry/react-native';
import * as Application from 'expo-application';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Updates from 'expo-updates';

import { config } from '$domain/constants';
import type { User } from '$domain/entities';

import type { Primitives } from '$types';

const prodSampleRate = 0.5;
const fullSampleRate = 1;
const APPLE_URL_REGEX = /apple.com/i;

export const routingInstrumentation = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
});

class ErrorMonitoringClass {
  /* ***** *****  Setup  ***** ***** */

  init() {
    const sampleRate =
      config.env === 'production' ? prodSampleRate : fullSampleRate;
    const isEnabled = config.env !== 'development';

    if (!config.sentryDsn) {
      console.log('Failed to initialize Sentry - No DSN found');

      return;
    }

    Sentry.init({
      beforeBreadcrumb(breadcrumb) {
        if (
          typeof breadcrumb.data?.url === 'string' &&
          APPLE_URL_REGEX.exec(breadcrumb.data.url)
        ) {
          return null;
        }

        if (breadcrumb.category === 'console') {
          return null;
        }

        return breadcrumb;
      },
      debug: false,
      denyUrls: [APPLE_URL_REGEX],
      dsn: config.sentryDsn,
      enableAppStartTracking: true,
      enableAutoSessionTracking: true,
      enabled: isEnabled,
      enableNativeFramesTracking: true,
      enableStallTracking: true,
      enableUserInteractionTracing: true,
      environment: config.env,
      integrations: [routingInstrumentation],
      tracesSampleRate: sampleRate,
    });

    this.setSessionTags();
  }

  setSessionTags() {
    Sentry.setExtras({
      deviceYearClass: Device.deviceYearClass,
      linkingUri: Constants.linkingUri,
      manifest: Updates.manifest,
    });

    Sentry.setTag('expoChannel', Updates.channel);
    Sentry.setTag('appVersion', Application.nativeApplicationVersion);
    Sentry.setTag('deviceId', Constants.sessionId);
    Sentry.setTag('executionEnvironment', Constants.executionEnvironment);
    Sentry.setTag('expoGoVersion', Constants.expoVersion);
    Sentry.setTag('expoRuntimeVersion', Constants.expoRuntimeVersion);
  }

  /* ***** *****  User related  ***** ***** */

  setUser(user: User) {
    Sentry.setUser({
      email: user.email,
      id: user.id,
    });
  }

  clearUser() {
    Sentry.setUser(null);
  }

  /* ***** *****  Monitoring  ***** ***** */

  event(event: Event) {
    Sentry.captureEvent(event);
  }

  exception(exception: unknown) {
    Sentry.captureException(exception);
  }

  message(
    message: string,
    context?: Parameters<typeof Sentry.captureMessage>[1],
  ) {
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

  scope(callback: (scope: Scope) => void) {
    Sentry.withScope(callback);
  }
}

export const ErrorMonitoring = new ErrorMonitoringClass();
