import {
  breadcrumbsCategory,
  breadcrumbType,
} from '$core/monitoring/constants';
import ErrorMonitoring, { Severity } from '$core/monitoring/errorMonitoring';
import Toaster from '$core/toaster';

import { ErrorType, NetworkErrorType, UserMessageType } from './logger.types';
import hasUserMessage from './logger.utils';

class LoggerClass {
  /* ***** *****  UI  ***** ***** */

  showToast(userMessage?: UserMessageType) {
    // Display a Toast for the user if needed
    if (hasUserMessage(userMessage)) {
      Toaster.show({
        type: 'error',
        text1: userMessage.title,
        text2: userMessage.message,
      });
    }
  }

  removeToast() {
    Toaster.hide();
  }

  /* ***** *****  Logging  ***** ***** */

  networkError({ description, requestData, userMessage }: NetworkErrorType) {
    ErrorMonitoring.breadcrumbs({
      type: breadcrumbType.http,
      category: breadcrumbsCategory.network,
      message: description,
      level: Severity.Error,
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

  error({ error, type, message, userMessage }: ErrorType) {
    const errorMessage = `[${type}]: ${message}`;

    ErrorMonitoring.scope((scope) => {
      scope.setLevel(Severity.Error);

      ErrorMonitoring.exception(error);
      ErrorMonitoring.message(errorMessage);
    });

    this.showToast(userMessage);
  }
}

const Logger = new LoggerClass();

export default Logger;
