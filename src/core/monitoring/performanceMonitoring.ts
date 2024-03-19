import type { ReactNavigationTransactionContext } from '@sentry/react-native';
import * as Sentry from '@sentry/react-native';
import type { Span } from '@sentry/types';

class PerformanceMonitoringClass {
  startTransaction(context: ReactNavigationTransactionContext) {
    Sentry.startTransaction(context);
  }

  setScope(transaction: Span) {
    Sentry.getCurrentHub().configureScope((scope) =>
      scope.setSpan(transaction),
    );
  }

  getTransaction() {
    return Sentry.getCurrentHub().getScope().getTransaction();
  }
}

export const PerformanceMonitoring = new PerformanceMonitoringClass();
