import {
  ErrorMonitoring,
  breadcrumbsCategory,
  breadcrumbType,
} from '$core/monitoring';
import { Toaster } from '$core/toaster';

import type {
  ErrorType,
  NetworkErrorType,
  UserMessageType,
} from './logger.types';

class LoggerClass {
  /* ***** *****  UI  ***** ***** */

  showToast(userMessage?: UserMessageType) {
    if (
      userMessage &&
      Boolean(userMessage.title) &&
      Boolean(userMessage.message)
    ) {
      Toaster.show({
        type: 'error',
        text1: userMessage.title,
        text2: userMessage.message,
      });
    }
  }

  /* ***** *****  Logging  ***** ***** */

  networkError({ description, requestData, userMessage }: NetworkErrorType) {
    ErrorMonitoring.breadcrumbs({
      type: breadcrumbType.http,
      category: breadcrumbsCategory.network,
      message: description,
      level: 'error',
      timestamp: Date.now(),
      data: {
        url: requestData.request,
        method: requestData.method,
        status_code: requestData.statusCode,
        reason: requestData.reason,
      },
    });

    this.showToast(userMessage);
  }

  error({
    error,
    message,
    userMessage,
    level = 'error',
    transactionName,
  }: ErrorType) {
    ErrorMonitoring.scope((scope) => {
      scope.setLevel(level);
      scope.setContext('error', { error });

      if (transactionName) {
        scope.setTransactionName(transactionName);
      }

      ErrorMonitoring.message(message);
    });

    this.showToast(userMessage);
    this.dev(message);
  }

  dev(message: string) {
    // eslint-disable-next-line no-console
    console.log(message);
  }
}

export const Logger = new LoggerClass();
