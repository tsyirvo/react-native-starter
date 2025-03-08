import type { SeverityLevel } from '@sentry/types';

/* ***** *****  Toast Message  ***** ***** */

export type UserMessageType = { title: string; message: string };

/* ***** *****  Network  ***** ***** */

export type NetworkErrorType = {
  description?: string;
  requestData: {
    request: string;
    method?: string;
    statusCode?: number;
    reason?: string;
  };
  userMessage?: UserMessageType;
};

/* ***** *****  Error  ***** ***** */

export type BaseErrorType = {
  message: string;
};

export interface ErrorType extends BaseErrorType {
  error: unknown;
  userMessage?: UserMessageType;
  level?: SeverityLevel;
  transactionName?: string;
}
