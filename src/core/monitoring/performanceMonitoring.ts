/* eslint-disable import/no-extraneous-dependencies */

import * as Sentry from '@sentry/react-native';
import { Span } from '@sentry/types';

class PerformanceMonitoringClass {
  startTransaction(context: Sentry.ReactNavigationTransactionContext) {
    Sentry.startTransaction(context);
  }

  setScope(transaction: Span) {
    Sentry.getCurrentHub().configureScope((scope) =>
      scope.setSpan(transaction),
    );
  }

  getTransaction() {
    return Sentry.getCurrentHub().getScope()?.getTransaction();
  }
}

const PerformanceMonitoring = new PerformanceMonitoringClass();

export default PerformanceMonitoring;
