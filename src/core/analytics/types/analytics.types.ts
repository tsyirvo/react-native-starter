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
  | 'app-start'
  | 'XXX-screen-viewed'
  | 'user-logged-in'
  | 'user-logged-out';

export type SupportedProductIds =
  | 'monthly-subscription'
  | 'monthly-subscription-30-off'
  | 'monthly-subscription-50-off'
  | 'yearly-subscription'
  | 'yearly-subscription-30-off'
  | 'yearly-subscription-50-off';

export type SupportedRevenueTypes = 'purchase';
