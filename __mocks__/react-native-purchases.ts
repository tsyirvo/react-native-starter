export const PURCHASES_ERROR_CODE = {
  UNKNOWN_ERROR: 0,
  PURCHASE_CANCELLED_ERROR: 1,
  STORE_PROBLEM_ERROR: 2,
  PURCHASE_NOT_ALLOWED_ERROR: 3,
  PURCHASE_INVALID_ERROR: 4,
  PRODUCT_NOT_AVAILABLE_FOR_PURCHASE_ERROR: 5,
  PRODUCT_ALREADY_PURCHASED_ERROR: 6,
  RECEIPT_ALREADY_IN_USE_ERROR: 7,
  INVALID_RECEIPT_ERROR: 8,
  MISSING_RECEIPT_FILE_ERROR: 9,
  NETWORK_ERROR: 10,
  INVALID_CREDENTIALS_ERROR: 11,
  UNEXPECTED_BACKEND_RESPONSE_ERROR: 12,
  INVALID_APP_USER_ID_ERROR: 14,
  OPERATION_ALREADY_IN_PROGRESS_ERROR: 15,
  UNKNOWN_BACKEND_ERROR: 16,
};

export const LOG_LEVEL = {
  VERBOSE: 'VERBOSE',
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
};

const Purchases = {
  configureWith: jest.fn(),
  getOfferings: jest.fn().mockResolvedValue({ all: {}, current: null }),
  getCustomerInfo: jest.fn().mockResolvedValue({}),
  purchasePackage: jest.fn().mockResolvedValue({}),
  restorePurchases: jest.fn().mockResolvedValue({}),
  setLogLevel: jest.fn(),
  setDebugLogsEnabled: jest.fn(),
  getAppUserID: jest.fn().mockResolvedValue('mock-user-id'),
  logIn: jest.fn().mockResolvedValue({}),
  logOut: jest.fn().mockResolvedValue({}),
  setAttributes: jest.fn().mockResolvedValue(undefined),
};

export default Purchases;
