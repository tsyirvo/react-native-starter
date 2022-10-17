/* ***** *****  Toast Message  ***** ***** */

type EmptyMessage = {};
export type ValidMessage = { title: string; message: string };

export type UserMessageType = EmptyMessage | ValidMessage;

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
  type: string;
  message: string;
};

export type ErrorType = BaseErrorType & {
  error: unknown;
  userMessage?: UserMessageType;
};
