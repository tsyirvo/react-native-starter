/* ***** *****  Breadcrumbs  ***** ***** */

// https://develop.sentry.dev/sdk/event-payloads/breadcrumbs/#breadcrumb-types
export const breadcrumbType = {
  debug: 'debug',
  default: 'default',
  error: 'error',
  http: 'http',
  info: 'info',
  navigation: 'navigation',
  query: 'query',
  transaction: 'transaction',
  ui: 'ui',
  user: 'user',
};

export const breadcrumbsCategory = {
  auth: 'auth',
  exception: 'exception',
  navigation: 'navigation',
  network: 'network',
};
