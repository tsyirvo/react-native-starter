export type AnalyticsValidPropertyType =
  | number
  | string
  | boolean
  | (string | number)[]
  | {
      [key: string]: AnalyticsValidPropertyType;
    };

export type SupportedPropertyNames = 'session-count' | 'language';

export type SupportedEventNames =
  // App lifecycle
  | 'app-start'
  | 'app-put-in-background'
  | 'app-put-in-foreground'
  // Navigation
  | 'XXX-screen-viewed';

export type SupportedProductIds =
  | 'monthly-subscription'
  | 'monthly-subscription-30-off'
  | 'monthly-subscription-50-off'
  | 'yearly-subscription'
  | 'yearly-subscription-30-off'
  | 'yearly-subscription-50-off';

export type SupportedRevenueTypes = 'purchase';
