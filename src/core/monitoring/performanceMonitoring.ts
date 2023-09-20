import type { ReactNavigationTransactionContext } from '@sentry/react-native';
import type { Span } from '@sentry/types';
import * as Sentry from 'sentry-expo';

class PerformanceMonitoringClass {
  startTransaction(context: ReactNavigationTransactionContext) {
    Sentry.Native.startTransaction(context);
  }

  setScope(transaction: Span) {
    Sentry.Native.getCurrentHub().configureScope((scope) =>
      scope.setSpan(transaction),
    );
  }

  getTransaction() {
    return Sentry.Native.getCurrentHub().getScope().getTransaction();
  }
}

export const PerformanceMonitoring = new PerformanceMonitoringClass();
