import {
  breadcrumbsCategory,
  breadcrumbType,
  ErrorMonitoring,
} from '$infra/monitoring';
import { Toaster } from '$infra/toaster';

import type {
  ErrorType,
  NetworkErrorType,
  UserMessageType,
} from './logger.types';

class LoggerClass {
  /* ***** *****  UI  ***** ***** */

  showToast(userMessage?: UserMessageType) {
    if (userMessage?.title && userMessage?.message) {
      Toaster.show({
        text1: userMessage.title,
        text2: userMessage.message,
        type: 'error',
      });
    }
  }

  /* ***** *****  Logging  ***** ***** */

  networkError({ description, requestData, userMessage }: NetworkErrorType) {
    ErrorMonitoring.breadcrumbs({
      category: breadcrumbsCategory.network,
      data: {
        method: requestData.method,
        reason: requestData.reason,
        status_code: requestData.statusCode,
        url: requestData.request,
      },
      level: 'error',
      message: description,
      timestamp: Date.now(),
      type: breadcrumbType.http,
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
    this.dev(message, { error });
  }

  dev(...data: unknown[]) {
    if (__DEV__) {
      console.log(...data);
    }
  }
}

export const Logger = new LoggerClass();
