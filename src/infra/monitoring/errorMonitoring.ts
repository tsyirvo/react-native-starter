/* eslint-disable @typescript-eslint/no-deprecated */

import type { Event, Scope, User } from '@sentry/react-native';
import * as Sentry from '@sentry/react-native';
import type { Breadcrumb, CaptureContext, SeverityLevel } from '@sentry/types';
import * as Application from 'expo-application';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Updates from 'expo-updates';

import { config } from '$domain/constants';

import type { Primitives } from '$types';

const prodSampleRate = 0.5;
const fullSampleRate = 1;

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
      // eslint-disable-next-line no-console
      console.log('Failed to initialize Sentry - No DSN found');

      return;
    }

    Sentry.init({
      dsn: config.sentryDsn,
      debug: false,
      tracesSampleRate: sampleRate,
      enableAppStartTracking: true,
      enableNativeFramesTracking: true,
      enableStallTracking: true,
      enableUserInteractionTracing: true,
      enabled: isEnabled,
      environment: config.env,
      integrations: [routingInstrumentation],
      denyUrls: [/onesignal.com/i, /apple.com/i],
      beforeBreadcrumb(breadcrumb) {
        if (typeof breadcrumb.data?.url === 'string') {
          if (
            breadcrumb.data.url.match(/onesignal.com/i) ??
            breadcrumb.data.url.match(/apple.com/i)
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

    this.setSessionTags();
  }

  setSessionTags() {
    Sentry.setExtras({
      manifest: Updates.manifest,
      deviceYearClass: Device.deviceYearClass,
      linkingUri: Constants.linkingUri,
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
    Sentry.setUser(user);
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

  message(message: string, context?: CaptureContext | SeverityLevel) {
    Sentry.captureMessage(message, context);
  }

  tag(key: string, value: Primitives) {
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
