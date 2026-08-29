export const PURCHASES_ERROR_CODE = {
  INVALID_APP_USER_ID_ERROR: 14,
  INVALID_CREDENTIALS_ERROR: 11,
  INVALID_RECEIPT_ERROR: 8,
  MISSING_RECEIPT_FILE_ERROR: 9,
  NETWORK_ERROR: 10,
  OPERATION_ALREADY_IN_PROGRESS_ERROR: 15,
  PRODUCT_ALREADY_PURCHASED_ERROR: 6,
  PRODUCT_NOT_AVAILABLE_FOR_PURCHASE_ERROR: 5,
  PURCHASE_CANCELLED_ERROR: 1,
  PURCHASE_INVALID_ERROR: 4,
  PURCHASE_NOT_ALLOWED_ERROR: 3,
  RECEIPT_ALREADY_IN_USE_ERROR: 7,
  STORE_PROBLEM_ERROR: 2,
  UNEXPECTED_BACKEND_RESPONSE_ERROR: 12,
  UNKNOWN_BACKEND_ERROR: 16,
  UNKNOWN_ERROR: 0,
};

export const LOG_LEVEL = {
  DEBUG: 'DEBUG',
  ERROR: 'ERROR',
  INFO: 'INFO',
  VERBOSE: 'VERBOSE',
  WARN: 'WARN',
};

const Purchases = {
  configureWith: jest.fn(),
  getAppUserID: jest.fn().mockResolvedValue('mock-user-id'),
  getCustomerInfo: jest.fn().mockResolvedValue({}),
  getOfferings: jest.fn().mockResolvedValue({ all: {}, current: null }),
  logIn: jest.fn().mockResolvedValue({}),
  logOut: jest.fn().mockResolvedValue({}),
  purchasePackage: jest.fn().mockResolvedValue({}),
  restorePurchases: jest.fn().mockResolvedValue({}),
  setAttributes: jest.fn().mockResolvedValue(undefined),
  setDebugLogsEnabled: jest.fn(),
  setLogLevel: jest.fn(),
};

export default Purchases;
