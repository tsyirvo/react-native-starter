import * as Sentry from '@sentry/react-native';
import type { StartSpanOptions, Span } from '@sentry/types';

class PerformanceMonitoringClass {
  startTransaction<T>(
    context: StartSpanOptions,
    callback: (span: Span | undefined) => T,
  ) {
    Sentry.startSpan(context, callback);
  }

  startIndependentTransaction(context: StartSpanOptions) {
    Sentry.startInactiveSpan(context);
  }
}

export const PerformanceMonitoring = new PerformanceMonitoringClass();
