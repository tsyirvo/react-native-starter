import type { SeverityLevel } from '@sentry/react-native';

/* ***** *****  Toast Message  ***** ***** */

export interface UserMessageType {
  title: string;
  message: string;
}

/* ***** *****  Network  ***** ***** */

export interface NetworkErrorType {
  description?: string;
  requestData: {
    request: string;
    method?: string;
    statusCode?: number;
    reason?: string;
  };
  userMessage?: UserMessageType;
}

/* ***** *****  Error  ***** ***** */

export interface BaseErrorType {
  message: string;
}

export interface ErrorType extends BaseErrorType {
  error: unknown;
  userMessage?: UserMessageType;
  level?: SeverityLevel;
  transactionName?: string;
}
