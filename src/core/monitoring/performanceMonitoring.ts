import * as Sentry from '@sentry/react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Span, TransactionContext } from '@sentry/types';

class PerformanceMonitoringClass {
  startTransaction(context: TransactionContext) {
    Sentry.startTransaction(context);
  }

  setScope(transaction?: Span) {
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
