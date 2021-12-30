/* ***** *****  Breadcrumbs  ***** ***** */

// https://develop.sentry.dev/sdk/event-payloads/breadcrumbs/#breadcrumb-types
export const breadcrumbType = {
  default: 'default',
  debug: 'debug',
  error: 'error',
  navigation: 'navigation',
  http: 'http',
  info: 'info',
  query: 'query',
  transaction: 'transaction',
  ui: 'ui',
  user: 'user',
};

export const breadcrumbsCategory = {
  network: 'network',
  exception: 'exception',
  navigation: 'navigation',
  auth: 'auth',
};

/* ***** *****  Tags  ***** ***** */

export const tags = {
  locale: 'Locale',
  env: 'Environment',
};
