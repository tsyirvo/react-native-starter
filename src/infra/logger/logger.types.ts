import type { SeverityLevel } from '@sentry/react-native';

/* ***** *****  Toast Message  ***** ***** */

export interface UserMessageType {
  message: string;
  title: string;
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
  level?: SeverityLevel;
  transactionName?: string;
  userMessage?: UserMessageType;
}
