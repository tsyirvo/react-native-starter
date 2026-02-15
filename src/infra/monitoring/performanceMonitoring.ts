import * as Sentry from '@sentry/react-native';

class PerformanceMonitoringClass {
  startTransaction<T>(
    context: Parameters<typeof Sentry.startSpan>[0],
    callback: (span: Sentry.Span | undefined) => T,
  ) {
    return Sentry.startSpan(context, callback);
  }

  startIndependentTransaction(
    context: Parameters<typeof Sentry.startInactiveSpan>[0],
  ) {
    return Sentry.startInactiveSpan(context);
  }
}

export const PerformanceMonitoring = new PerformanceMonitoringClass();
